var logger = require('winston');

logger.add(
  logger.transports.File,
  {
    filename: GLOBAL.config.logging.filename,
    level: GLOBAL.config.logging.level
  }
);

module.exports = logger;
