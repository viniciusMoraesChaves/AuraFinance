const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

router.post('/register', authController.createUser) // rota criar usuario

module.exports = router