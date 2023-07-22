const messages = require('../../models/messages')
const { buildErrorObject, handleError } = require('../../middleware/utils')

const { bad_request, ok } = require('../../../status_codes')

const add = async (req, res) => {
  try {
    const { name, email, message } = req.body
    if (!name || !email || !message) throw new Error('Incomplete data')

    const newMessage = new messages({ from: { name, email }, message })
    await newMessage.save()

    return res.status(ok).send({ status: 'ok' })
  } catch (err) {
    return handleError(res, buildErrorObject(bad_request, err))
  }
}

module.exports = { add }
