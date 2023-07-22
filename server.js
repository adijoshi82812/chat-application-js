require('dotenv').config()
require('./config/startup')
const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const init = require('./config/mongo')
const { socket } = require('./config/socket')

const { ok, not_found } = require('./status_codes')

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
const app = express()

// Database init
init()

app.use(fileUpload())
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
app.use(cors())
app.use(morgan('dev'))
app.use(require('./app/routes'))

app.get('/', (_req, res) =>
  // eslint-disable-next-line no-undef
  res.status(ok).sendFile(path.join(__dirname) + '/pages/index.html')
)

app.all('*', (_req, res) =>
  res.status(not_found).json({ error: { message: 'URL NOT FOUND' } })
)

const server = app.listen(PORT, () => {
  const port = server.address().port
  console.log(`Server running at port: ${port}`)
})

socket(server)
