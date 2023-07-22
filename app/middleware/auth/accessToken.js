const jwt = require('jsonwebtoken')

// eslint-disable-next-line no-undef
const AUTH_SECRET = process.env.AUTH_SECRET

const accessToken = (email) => {
  return jwt.sign({ email }, AUTH_SECRET, { expiresIn: '1800s' })
}

module.exports = { accessToken }
