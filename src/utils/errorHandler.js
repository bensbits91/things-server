const { AppError } = require('../errors/errors');
const logger = require('./logger');

function errorHandler(error, req, reply) {
   logger.error('global error handler', {
      requestId: req.id,
      statusCode: error.statusCode,
      userUuid: req.userUuid,
      error: error.message || error,
      stack: error.stack
   });

   if (error instanceof AppError) {
      reply
         .header('X-Request-ID', req.id)
         .code(error.statusCode)
         .send({ message: error.message });
   } else if (error.statusCode === 401) {
      const msg = error.message || error;
      if (msg.includes('Authorization token expired')) {
         reply
            .header('X-Request-ID', req.id)
            .code(401)
            .send({ message: 'Authorization token expired' });
      } else {
         reply
            .header('X-Request-ID', req.id)
            .code(401)
            .send({ message: 'User unauthorized' });
      }
   } else {
      reply
         .header('X-Request-ID', req.id)
         .code(500)
         .send({ message: 'Internal Server Error' });
   }
}

module.exports = errorHandler;
