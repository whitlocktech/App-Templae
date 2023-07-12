const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_DB_URL = process.env.MONGO_DB_URL

if (!MONGO_DB_URL) { 
  throw new Error('MONGO_DB_URL must be provided')
}

mongoose.connection.once('open', () => { 
  console.log('MongoDB connection established successfully')
})

mongoose.connection.on('error', (err) => { 
  throw new Error(`MongoDB connection error: ${err}`)
})

async function mongoConnect() { 
  await mongoose.connect(MONGO_DB_URL, {
  })
}

async function mongoDisconnect() { 
  await mongoose.disconnect()
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
}