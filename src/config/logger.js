const winston = require('winston');

const LOGGER = {
  info: "log/info.log",
  error: "log/error.log",
  warn: "log/warn.log",
  debug: "log/debug.log",
  data: "log/data.log"
}

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: Object.entries(LOGGER).map(([key, filename]) => {
    return new winston.transports.File({
      filename: filename,
      level: key,
      timestamp: true
    });
  })
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
