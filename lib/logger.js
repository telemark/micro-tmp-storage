const pkg = require('../package.json')
const winston = require('winston')

const winstonConsole = new winston.transports.Console({
  formatter: options => `${new Date().toUTCString()} - ${options.level.toUpperCase()} - ${(options.message ? options.message : '')}`
})

const winstonTransports = [winstonConsole]

const logger = new (winston.Logger)({
  transports: winstonTransports
})

module.exports = (level, message) => {
  const data = Array.isArray(message) ? message : [message]
  const logMessage = `${pkg.name} - ${pkg.version}: ${data.join(' - ')}`
  return logger.log(level, logMessage)
}
