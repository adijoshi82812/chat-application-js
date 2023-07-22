const { isEmail } = require('validator')
const { buildErrorObject, handleError } = require('../utils')

const { bad_request } = require('../../../status_codes')

const isEmailValid = (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) throw new Error('Email address required')
    if (!isEmail(email)) throw new Error('Email address invalid')

    next()
  } catch (err) {
    return handleError(res, buildErrorObject(bad_request, err))
  }
}

module.exports = { isEmailValid }
