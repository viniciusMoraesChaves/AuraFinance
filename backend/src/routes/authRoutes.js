const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

router.post('/register', authController.createUser) // rota criar usuario
router.post('/login', authController.login) // rota do login

module.exports = router