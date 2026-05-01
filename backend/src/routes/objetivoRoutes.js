const express = require('express')
const router = express.Router()

const objetivoController = require('../controllers/objetivoController')
const checkToken = require('../middlewares/checkToken')

router.post('/create', checkToken, objetivoController.createObjetivo) /* criar objetivo */
router.get('/list', checkToken, objetivoController.listObjetivos) /* listar objetivo */
router.put('/edit/:id', checkToken, objetivoController.editObjetivo) /*editar objetivo */
router.delete('/delete/:id', checkToken, objetivoController.deleteObjetivo) /*deletar objetivo */
router.put('/add/:id', checkToken, objetivoController.addValorObjetivo) /* adicionar valor no objetivo, parte da simulação dos valores */

module.exports = router