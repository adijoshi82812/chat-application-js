const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
const MONGO_URI = process.env.MONGO_URI

module.exports = () => {
  mongoose.connect(MONGO_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const conn = mongoose.connection
  conn.on('error', () => console.log('Database connection error'))
  conn.once('open', () => console.log('Database connected successfully'))
}
