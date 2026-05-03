const express = require('express')
const router = express.Router()

const Usuario = require('../models/User')
const Categoria = require('../models/CategoriaTransacao')
const Transacao = require('../models/Transacao')

router.get('/teste-insert', async (req, res) => {
  try {
    // 1. criar usuário
    const usuario = await Usuario.create({
      nome: "Maria",
      idade: 30,
      email: "maria@email.com",
      senha: "123456"
    })

    // 2. criar categoria
    const categoria = await Categoria.create({
      nome: "Transporte"
    })

    // 3. criar transação
    const transacao = await Transacao.create({
      id_usuario: usuario.id_usuario,
      id_categoria: categoria.id_categoria,
      status: "pendente",
      descricao: "Uber",
      recorrente: false,
      data: new Date(),
      valor: 35.90,
      entrada_saida: "saida"
    })

    res.json({
      usuario,
      categoria,
      transacao
    })

  } catch (err) {
  console.error(err) // 👈 ISSO AQUI É IMPORTANTE
  res.status(500).json({ erro: err.message, detalhes: err.errors })
}
})



module.exports = router