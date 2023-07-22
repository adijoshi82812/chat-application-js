const users = require('../../models/users')
const { buildErrorObject, handleError } = require('../../middleware/utils')
const { accessToken, decrypt } = require('../../middleware/auth')

const { accepted, bad_request } = require('../../../status_codes')

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!password) throw new Error('Password required')

    const user = await users.findOne({ email })
    if (!user?.email) throw new Error('Invalid user')
    if (!(await decrypt(password, user.password)))
      throw new Error('Password incorrect')

    const token = accessToken(email)
    return res.status(accepted).send({ name: user.name, email, token })
  } catch (err) {
    return handleError(res, buildErrorObject(bad_request, err))
  }
}

module.exports = { login }
