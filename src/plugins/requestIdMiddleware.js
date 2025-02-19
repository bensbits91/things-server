const fp = require('fastify-plugin');
const { v4: uuidv4 } = require('uuid');

async function requestIdMiddleware(fastify, options) {
   fastify.addHook('onRequest', (request, reply, done) => {
      const requestId = request.headers['x-request-id']; // get x-request-id header from request
      if (requestId) {
         request.id = requestId; // add x-request-id header to request object so it can be passed to logger and other services
      } else {
         request.id = uuidv4(); // Generate a new UUID if not available in x-request-id header
      }
      done();
   });
}

module.exports = fp(requestIdMiddleware);
