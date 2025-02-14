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
    const headerB64 = rawToken.split('.')[0];
    const headerJson = Buffer.from(headerB64, 'base64').toString('utf8');
    return JSON.parse(headerJson);
  }

  async function getKey(request, token) {
    // 'token' is the decoded payload only. We need the raw token from headers:
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
      await request.jwtVerify();
      console.log('JWT verified successfully');
    } catch (err) {
      console.log('Error in authMiddleware:', err);
      reply.send(err);
    }
  });
};

module.exports = authMiddleware;