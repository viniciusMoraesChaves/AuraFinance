const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = class authController {

    /*aqui é o cadastro*/
    static async createUser(req, res) {

        try {

            const user = { 
                nome: req.body.nome,
                email: req.body.email,
                idade: req.body.idade,
                senha: req.body.senha,
            }

            if (!user.nome) 
            {
                return res.status(400).json({ message: 'O nome é obrigatório!' })
            }

            if (!user.email) 
            {
                return res.status(400).json({ message: 'O email é obrigatório!' })
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            if (!emailRegex.test(user.email))
            {
                 return res.status(400).json({ message: 'Email inválido!' })
            }

            if (!user.idade || isNaN(user.idade) || Number(user.idade) <= 0)   
            {
                return res.status(400).json({ message: 'A idade está inválida!'})
            }

            if (!user.senha) 
            {
                return res.status(400).json({ message: 'A senha é obrigatória!' })
            }

            if (user.senha.length < 8)
            {
                return res.status(400).json({ message: 'A senha deve ter no mínimo 8 caracteres!' })
            }

            const userExists = await User.findOne({ where: { email: user.email } })

            if (userExists) 
            {
                return res.status(409).json({ message: 'Este email já está cadastrado!' })
            }

            /*parte da criptografia*/
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(user.senha,salt)

            user.senha = passwordHash

            const newUser = await User.create(user)
            
            return res.status(201).json({
                message: 'Usuário criado com sucesso!',
                user: {
                    id: newUser.id_usuario,
                    nome: newUser.nome,
                    email: newUser.email
                }
            })

        } catch (error) {

            console.log(error)
           
            return res.status(500).json({
                message: 'Erro ao criar usuário',
                error: error.message
            })
        }
    }

    /*login*/
    static async login(req, res) {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios!' })
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' })
    }

    const senhaValida = await bcrypt.compare(senha, user.senha)

    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha incorreta!' })
    }

    const token = jwt.sign(
      { id: user.id_usuario, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      token
    })

  } catch (error) {
    return res.status(500).json({
      message: 'Erro no login',
      error: error.message
    })
  }
}
 // aqui é a busca das informacoes do usuario
static async getCurrentUser(req,res) {

    try {

        const user = await User.findByPk(req.user.id, { // funcao que busca pela PK (chave primaria (id do usuario))

             attributes: ['id_usuario', 'nome', 'email', 'idade']  // informacoes que queremos retornar
        })

        if(!user)
        {
            return res.status(404).json({message: 'Usuário não encontrado!'}) // se nao achar o usuario
        }

        return res.status(200).json({ user }) // se achou devolvemos o usuario (mensagem de sucesso!)

    } catch (error) {
        
        return res.status(500).json({ message: 'Erro buscar usuário', error: error.message }) // se deu algum erro na busca que nao seja que nao encontrou o usuario
    
    }
    
}
static async updateUser(req, res) {
  try {
    const { nome, email, idade, senha } = req.body

    const user = await User.findByPk(req.user.id) /*findByPk ele busca a chave primaria */

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' })
    }

    /*muda o nome*/
    if (nome) {
      user.nome = nome
    }

    /* muda o email por enquanto (ainda vou pesquisar para não poder alterar email)*/
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email inválido!' })
      }

      const emailExists = await User.findOne({ where: { email } })

      if (emailExists && emailExists.id_usuario !== user.id_usuario) {
        return res.status(409).json({ message: 'Este email já está em uso!' })
      }

      user.email = email
    }

    /*muda a idade*/
    if (idade !== undefined) {
      if (isNaN(idade) || Number(idade) <= 0) {
        return res.status(400).json({ message: 'A idade está inválida!' }) 
      }

      user.idade = idade
    }

    /*mudar a senha*/
    if (senha) {
      if (senha.length < 8) {
        return res.status(400).json({ message: 'A senha deve ter no mínimo 8 caracteres!' })
      }

      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(senha, salt)
      user.senha = passwordHash
    }

    await user.save()

    return res.status(200).json({
      message: 'Usuário atualizado com sucesso!',
      user: {
        id: user.id_usuario,
        nome: user.nome,
        email: user.email,
        idade: user.idade
      }
    })

  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao atualizar usuário',
      error: error.message
    })
  }
}

}
