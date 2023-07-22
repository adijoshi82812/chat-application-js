const express = require('express')
const { isEmailValid, isUser } = require('../middleware/auth')
const { login, signup } = require('../controllers/users')

const router = express.Router()

router.post('/login', isEmailValid, login)
router.post('/signup', isEmailValid, isUser, signup)

module.exports = router
