const handleError = (res, errObject = {}) => {
  return res
    .status(errObject.status)
    .json({ error: { message: errObject.err.message } })
}

module.exports = { handleError }
