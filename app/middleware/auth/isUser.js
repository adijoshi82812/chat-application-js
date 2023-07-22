const users = require('../../models/users')
const { buildErrorObject, handleError } = require('../utils')

const { bad_request } = require('../../../status_codes')

const isUser = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await users.findOne({ email })

    if (user?.email) throw new Error('User already exists')

    next()
  } catch (err) {
    return handleError(res, buildErrorObject(bad_request, err))
  }
}

module.exports = { isUser }
