const logger = require('../../utils/logger');

module.exports = async function createSearch(req, reply) {
   try {
      const {
         server: { cache },
         body: { query, results }
      } = req;
      const search = await this.searchService.createSearch(query, results);

      // Cache the newly created search cache
      const cacheKey = `search:${query}`;
      await cache.set(cacheKey, search);

      reply.header('X-Request-ID', req.id).code(201).send(search);
   } catch (error) {
      logger.error('Error creating search', { requestId: req.id, error });
      reply.header('X-Request-ID', req.id).code(500).send({ message: error.message });
   }
};
