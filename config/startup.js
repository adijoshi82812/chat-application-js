const fs = require('fs')
const dotenv = require('dotenv')

const exampleEnv = fs.readFileSync('.env.example').toString()
const requiredEnv = dotenv.parse(exampleEnv)

// eslint-disable-next-line no-undef
const missingVars = Object.keys(requiredEnv).filter((key) => !process.env[key])

if (missingVars.length > 0) {
  console.error(`Missing environment variables: ${missingVars.join(', ')}`)
  // eslint-disable-next-line no-undef
  process.exit(1)
}
