const bcrypt = require('bcrypt')

const decrypt = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword)
}

module.exports = { decrypt }
