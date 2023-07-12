const path = require('path')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const loggingMiddlewares = require('./middlewares/logging.middlewares')
const apiRouter = require('./routes/api')
const { passport } = require('./services/auth')

const app = express()

app.use(express.json())
app.use(helmet())
app.use(loggingMiddlewares)
app.use(cors({
  origin: '*',
}))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB_URL,
      collectionName: 'sessions',
    }),
  }),
)
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', apiRouter)

app.get('/', (req, res) => { 
  res.json({ message: 'Hello world' })
})

app.use(express.static(path.join(__dirname, '..', 'public',)))

module.exports = app