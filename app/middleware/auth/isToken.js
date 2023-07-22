const jwt = require('jsonwebtoken')
const users = require('../../models/users')
const { buildErrorObject, handleError } = require('../utils')

const { bad_request } = require('../../../status_codes')

// eslint-disable-next-line no-undef
const AUTH_SECRET = process.env.AUTH_SECRET

const isToken = async (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization
    let token = authHeaders && authHeaders.split(' ')[1]
    if (!token) throw new Error('Token required')

    token = jwt.verify(token, AUTH_SECRET)
    if (!token?.email) throw new Error('Invalid token')

    const user = await users.findOne({ email: token.email })
    if (!user?.email) throw new Error('Invalid user')

    next()
  } catch (err) {
    return handleError(res, buildErrorObject(bad_request, err))
  }
}

module.exports = { isToken }
