const fp = require('fastify-plugin');
const InMemoryCache = require('../cache/inMemoryCache');

async function cachePlugin(fastify, options) {
   const cache = new InMemoryCache();
   fastify.decorate('cache', cache);
}

module.exports = fp(cachePlugin);
