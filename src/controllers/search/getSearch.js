const logger = require('../../utils/logger');

module.exports = async function getSearch(req, reply) {
   try {
      const {
         id,
         server: { cache },
         query: { query, types }
      } = req;

      const normalizedTypes = ['TV Show', 'Book', 'Movie', 'Video Game'];

      const results = [];

      for (const type of normalizedTypes) {
         const cacheKey = `search:${query}:${type}`;
         let typeResults = await cache.get(cacheKey);
         logger.info('Results FROM CACHE', {
            requestId: id,
            type,
            count: typeResults?.results?.length || typeResults?.length || 0
         });

         if (!typeResults) {
            typeResults = await this.searchService.getSearch(query, type);
            logger.info('Results FROM DB', {
               requestId: id,
               type,
               count: typeResults?.results?.length || typeResults?.length || 0
            });
            if (typeResults) {
               await cache.set(cacheKey, typeResults);
            } else {
               typeResults = await this.aggregatedService.search(query, type);
               logger.info('Results FROM AGGREGATED SEARCH', {
                  requestId: id,
                  type,
                  count: typeResults?.results?.length || typeResults?.length || 0
               });
               await this.searchService.createSearch(query, type, typeResults);
               await cache.set(cacheKey, typeResults);
            }
         }

         results.push(...(typeResults.results || typeResults));
      }

      if (Object.keys(results).length === 0) {
         logger.error('searchController.js ~ Search not found:', {
            requestId: id,
            error: error.message || error
         });
         reply
            .header('X-Request-ID', id)
            .code(404)
            .send({ message: 'Search not found' });
      } else {
         reply.header('X-Request-ID', id).code(200).send(results);
      }
   } catch (error) {
      logger.error('Error getting search:', {
         requestId: id,
         error: error.message || error
      });
      reply.header('X-Request-ID', id).code(500).send({ message: error.message });
   }
};
