const express = require('express')
const router = express.Router()

const transacaoController = require('../controllers/transacaoController')

router.post('/create', transacaoController.createTransacao)

module.exports = router