const mongoose = require('mongoose')

const messages = new mongoose.Schema({
  from: {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  message: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('messages', messages)
