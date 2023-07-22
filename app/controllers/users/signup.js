const users = require('../../models/users')
const { buildErrorObject, handleError } = require('../../middleware/utils')
const { accessToken, encrypt } = require('../../middleware/auth')

const { bad_request, created } = require('../../../status_codes')

const signup = async (req, res) => {
  try {
    let { name, email, password } = req.body
    if (!name) throw new Error('Name required')
    if (!password) throw new Error('Password required')

    password = await encrypt(password)
    const user = new users({ name, email, password })
    await user.save()

    const token = accessToken(email)
    return res.status(created).send({ name, email, token })
  } catch (err) {
    return handleError(res, buildErrorObject(bad_request, err))
  }
}

module.exports = { signup }
