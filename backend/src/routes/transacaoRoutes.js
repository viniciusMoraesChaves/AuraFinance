const express = require('express')
const router = express.Router()

const transacaoController = require('../controllers/transacaoController')
const checkToken = require('../middlewares/checkToken')

router.post('/create', checkToken, transacaoController.createTransacao) // criar transacao
router.get('/list', checkToken, transacaoController.listTransacao) // listar transacoes com ou sem filtros, por data, ordenado e por paginas
router.put('/edit/:id', checkToken, transacaoController.editTransacao) // editar transacao
router.delete('/delete-transacao/:id',checkToken,transacaoController.deleteTransacao) // deletar transacao
router.get('/listcategorias',checkToken, transacaoController.listCategorias) // listar categorias (na parte de paginacao limit = numero de transacoes por página (o padrao é de 5 em 5))
router.get('/resumo',checkToken,transacaoController.resumoTransacao) // resumo financeiro das transacoes
router.get('/gastos-categoria', checkToken, transacaoController.gastoCategoria) // gasto por gategoria

module.exports = router
