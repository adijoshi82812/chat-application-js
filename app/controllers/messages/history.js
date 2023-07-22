const messages = require('../../models/messages')
const { buildErrorObject, handleError } = require('../../middleware/utils')

const { bad_request, ok } = require('../../../status_codes')

const history = async (_req, res) => {
  try {
    const history = await messages.find({})

    return res.status(ok).send(history)
  } catch (err) {
    return handleError(res, buildErrorObject(bad_request, err))
  }
}

module.exports = { history }
