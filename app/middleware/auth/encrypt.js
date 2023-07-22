const bcrypt = require('bcrypt')

const encrypt = async (password) => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

module.exports = { encrypt }
