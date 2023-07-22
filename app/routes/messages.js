const express = require('express')
const { isToken } = require('../middleware/auth')
const { add, history } = require('../controllers/messages')

const router = express.Router()

router.post('/add', isToken, add)
router.get('/history', isToken, history)

module.exports = router
