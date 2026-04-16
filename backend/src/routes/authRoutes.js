const express = require('express')
const checkToken = require('../middlewares/checkToken')
const router = express.Router()

const authController = require('../controllers/authController')

router.post('/register', authController.createUser) // rota criar usuario
router.post('/login', authController.login) // rota do login
router.get('/me', checkToken,authController.getCurrentUser)

module.exports = router