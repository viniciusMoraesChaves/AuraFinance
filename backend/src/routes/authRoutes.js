const express = require('express')
const checkToken = require('../middlewares/checkToken')
const router = express.Router()

const authController = require('../controllers/authController')

router.post('/register', authController.createUser) // rota criar usuario
router.post('/login', authController.login) // rota do login
router.get('/me', checkToken,authController.getCurrentUser) // pegar dados do usuario
router.put('/edit-user', checkToken, authController.updateUser) // editar dados do usuario
router.delete('/delete-user', checkToken, authController.deleteUser) // apagar o usuario

module.exports = router