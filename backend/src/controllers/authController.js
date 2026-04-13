const { json } = require('sequelize')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

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
}