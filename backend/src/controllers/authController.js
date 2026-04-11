const User = require('../models/User')

module.exports = class authController {

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

            if (!user.email.includes('@')) 
            {
                return res.status(400).json({ message: 'Email inválido!' })
            }

            if (!user.idade || user.idade <= 0) 
            {
                return res.status(400).json({ message: 'A idade deve ser maior que 0!' })
            }

            if (!user.senha) 
            {
                return res.status(400).json({ message: 'A senha é obrigatória!' })
            }

            if (user.senha.length < 6)
            {
                return res.status(400).json({ message: 'A senha deve ter no mínimo 6 caracteres!' })
            }

            const userExists = await User.findOne({ where: { email: user.email } })

            if (userExists) 
            {
                return res.status(409).json({ message: 'Este email já está cadastrado!' })
            }

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

            return res.status(500).json({
                message: 'Erro ao criar usuário',
                error: error.message
            })
        }
    }
}