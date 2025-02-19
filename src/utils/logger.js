const winston = require('winston');
require('winston-daily-rotate-file');
const { Loggly } = require('winston-loggly-bulk');

const logger = winston.createLogger({
   defaultMeta: { service: 'things-server' }, // todo: maybe only needed for Loggly
   transports: [
      new Loggly({
         token: '308a11a7-900f-4698-8567-b847f3d47c3c', // todo: process.env.LOGGLY_TOKEN
         subdomain: 'benbpnw', // todo: process.env.LOGGLY_SUBDOMAIN
         tags: ['Winston-NodeJS'],
         json: true
      }),
      new winston.transports.Console({
         format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
         )
      }),
      new winston.transports.DailyRotateFile({
         filename: 'logs/things-server-%DATE%.log',
         datePattern: 'YYYY-MM-DD',
         //  zippedArchive: true,
         maxSize: '20m',
         maxFiles: '14d',
         format: winston.format.combine(winston.format.timestamp(), winston.format.json())
      })
   ]
});

// winston.log('info', 'Hello World from things-server!');
// logger.info('Test info log message to Loggly');
// logger.warn('Test warning log message to Loggly');
// logger.error('Test error log message to Loggly');

logger.on('error', err => {
   console.error('Error in logger:', err);
});

module.exports = logger;
