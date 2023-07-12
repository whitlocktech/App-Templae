const http = require('http')
require('dotenv').config()
const { mongoConnect } = require('./services/mongo')

const app = require('./app')

const PORT = process.env.PORT || 3000

const server = http.createServer(app)

async function startServer() {
  try {
    await mongoConnect()
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()