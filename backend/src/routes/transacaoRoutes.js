const express = require('express')
const router = express.Router()

const transacaoController = require('../controllers/transacaoController')
const checkToken = require('../middlewares/checkToken')

router.post('/create', checkToken, transacaoController.createTransacao)
router.get('/list', checkToken, transacaoController.listTransacao)
router.put('/edit/:id', checkToken, transacaoController.editTransacao)
router.delete('/delete-transacao/:id',checkToken,transacaoController.deleteTransacao)

module.exports = router