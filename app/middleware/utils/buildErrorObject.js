const buildErrorObject = (status, err = {}) => {
  return { status, err }
}

module.exports = { buildErrorObject }
