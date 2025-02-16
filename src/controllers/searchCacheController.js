const searchCacheService = require('../services/searchCacheService');

class SearchCacheController {
   constructor() {
      this.searchCacheService = new searchCacheService();
   }

   async createSearchCache(req, reply) {
      try {
         const {
            server: { cache },
            body: { query, results } // todo: will it be body? Is this a post or get?
         } = req;
         const searchCache = await this.searchCacheService.createSearchCache(
            query,
            results
         );

         // Cache the newly created search cache
         const cacheKey = `searchCache:${query}`;
         await cache.set(cacheKey, searchCache);

         reply.code(201).send(searchCache);
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   async getSearchCache(req, reply) {
      try {
         const {
            server: { cache },
            query: { query } // todo: this might need to be query.query and maybe that's bad naming
         } = req;

         const cacheKey = `searchCache:${query}`;
         let searchCache = await cache.get(cacheKey);

         if (!searchCache) {
            searchCache = await this.searchCacheService.getSearchCache(query);
            if (searchCache) {
               await cache.set(cacheKey, searchCache);
            } else {
               await cache.set(cacheKey, null); // Cache the non-existence
            }
         }

         if (!searchCache) {
            reply.code(404).send({ message: 'SearchCache not found' });
         } else {
            reply.code(200).send(searchCache);
         }
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   async getSearchCachesByUser(req, reply) {
      try {
         const {
            server: { cache },
            query: { userId }
         } = req;
         const cacheKey = `searchCachesByUser:${userId}`;
         let searchCaches = await cache.get(cacheKey);

         if (!searchCaches) {
            searchCaches = await this.searchCacheService.getSearchCachesByUser(
               userId
            );
            if (searchCaches) {
               await cache.set(cacheKey, searchCaches);
            } else {
               await cache.set(cacheKey, null); // Cache the non-existence
            }
         }

         if (!searchCaches) {
            reply.code(404).send({ message: 'SearchCaches not found' });
         } else {
            reply.code(200).send(searchCaches);
         }
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   async updateSearchCache(req, reply) {
      try {
         const {
            server: { cache },
            query: { query, results }
         } = req;
         const searchCache = await this.searchCacheService.updateSearchCache(
            query,
            results
         );
         reply.code(200).send(searchCache);
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   async deleteSearchCache(req, reply) {
      try {
         const {
            server: { cache },
            query: { query }
         } = req;
         const searchCache = await this.searchCacheService.deleteSearchCache(
            query
         );

         // Remove the search cache from the cache
         const cacheKey = `searchCache:${query}`;
         await cache.del(cacheKey);

         reply.code(200).send(searchCache);
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }
}

module.exports = SearchCacheController;
