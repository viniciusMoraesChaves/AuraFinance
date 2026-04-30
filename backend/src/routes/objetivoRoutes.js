const express = require('express')
const router = express.Router()

const objetivoController = require('../controllers/objetivoController')
const checkToken = require('../middlewares/checkToken')

router.post('/create', checkToken, objetivoController.createObjetivo)
router.get('/list', checkToken, objetivoController.listObjetivos)

module.exports = router