var logger = require('winston');

logger.add(
  logger.transports.File,
  { filename: GLOBAL.config.logging.filename }
);

module.exports = logger;
