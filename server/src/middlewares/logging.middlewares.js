const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const winston = require('winston')

const logsDirectory = path.join(__dirname, '..', '..', 'logs')
const accessLogPath = path.join(logsDirectory, 'access.log')
const errorLogPath = path.join(logsDirectory, 'error.log')
const consoleLogPath = path.join(logsDirectory, 'console.log')

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory)
}

const accessLogStream = fs.createWriteStream(accessLogPath, { flags: 'a' })

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: errorLogPath, level: 'error' }),
    new winston.transports.File({ filename: consoleLogPath })
  ]
})

const logToConsole = (...args) => {
  logger.info(...args)
}

const logToConsoleError = (...args) => { 
  logger.error(...args)
}

const loggingMiddlewares = (req, res, next) => { 
  morgan('combined', { stream: accessLogStream })(req, res, () => {
    const originalSend = res.send
    res.send = function (data) {
      const status = res.statusCode
      const message = res.statusMessage || ''
      if (status >= 400) {
        logger.error(`${status} - ${req.method} - ${req.originalUrl} - ${message}`)
      }
      res.send = originalSend
      return res.send(data)
    }
    next()
  })
}

console.log = process.env.NODE_ENV === 'production' ? logToConsole : console.log;


console.error = process.env.NODE_ENV === 'production' ? logToConsoleError : console.error;


module.exports = loggingMiddlewares