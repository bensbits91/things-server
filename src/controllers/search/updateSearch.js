const logger = require('../../utils/logger');

module.exports = async function updateSearch(req, reply) {
   const {
      server: { cache },
      body: { query, type, results }
   } = req;
   const search = await this.searchService.updateSearch(query, type, results);

   // Update the cache with the new search data
   const cacheKey = `search:${query}:${type}`;
   await cache.set(cacheKey, search);

   reply.header('X-Request-ID', req.id).code(200).send(search);
};
