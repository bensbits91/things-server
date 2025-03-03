const jwt = require('@fastify/jwt');
const jwksClient = require('jwks-rsa');

const authMiddleware = fastify => {
   const jClient = jwksClient({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
   });

   // Helper to decode just the JWT header from a raw token string
   function decodeHeader(rawToken) {
      const headerB64 = rawToken.split('.')[0]; // the first part of the token is the header
      const headerJson = Buffer.from(headerB64, 'base64').toString('utf8');
      return JSON.parse(headerJson);
   }

   async function addUserUuidToRequest(request) {
      const authHeader = request.headers.authorization || '';
      if (!authHeader) {
         throw new Error('No authorization header found');
      }
      const rawToken = authHeader.replace(/^Bearer\s+/, '');
      const headerB64 = rawToken.split('.')[1]; // the second part of the token is the payload
      const payload = Buffer.from(headerB64, 'base64').toString('utf8');
      const payloadJson = JSON.parse(payload);
      const userUuid = payloadJson['urn:bbThingsApp/userUuid'];
      request.userUuid = userUuid;
      return userUuid; // todo: don't think we need to return this
   }

   async function getKey(request, token) {
      // get raw token from request headers
      const authHeader = request.headers.authorization || '';
      const rawToken = authHeader.replace(/^Bearer\s+/, '');

      // Decode the header to access the 'kid'
      const header = decodeHeader(rawToken);
      const kid = header && header.kid;
      if (!kid) {
         throw new Error('No KID found in token header.');
      }

      // Use a Promise wrapper around getSigningKey
      return new Promise((resolve, reject) => {
         jClient.getSigningKey(kid, (err, key) => {
            if (err) return reject(err);
            resolve(key.getPublicKey());
         });
      });
   }

   fastify.register(jwt, {
      secret: getKey,
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256']
   });

   fastify.decorate('authenticate', async function (request, reply) {
      try {
         await addUserUuidToRequest(request);
         await request.jwtVerify();
         console.log('JWT verified successfully');
      } catch (error) {
         console.log('Error in authMiddleware:', error);
         if (error === 'UnauthorizedError: Authorization token expired') {
            reply.code(401).send({ error });
         }
         reply.send(error);
      }
   });
};

module.exports = authMiddleware;
