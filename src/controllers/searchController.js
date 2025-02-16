const searchService = require('../services/searchService');

class SearchController {
   constructor() {
      this.searchService = new searchService();
   }

   async createSearch(req, reply) {
      try {
         const {
            server: { cache },
            body: { query, results } // todo: will it be body? Is this a post or get?
         } = req;
         const search = await this.searchService.createSearch(
            query,
            results
         );

         // Cache the newly created search cache
         const cacheKey = `search:${query}`;
         await cache.set(cacheKey, search);

         reply.code(201).send(search);
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   async getSearch(req, reply) {
      try {
         const {
            server: { cache },
            query: { query } // todo: this might need to be query.query and maybe that's bad naming
         } = req;

         const cacheKey = `search:${query}`;
         let search = await cache.get(cacheKey);

         if (!search) {
            search = await this.searchService.getSearch(query);
            if (search) {
               await cache.set(cacheKey, search);
            } else {
               await cache.set(cacheKey, null); // Cache the non-existence
            }
         }

         if (!search) {
            reply.code(404).send({ message: 'Search not found' });
         } else {
            reply.code(200).send(search);
         }
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   async getSearchByUser(req, reply) {
      try {
         const {
            server: { cache },
            query: { userId }
         } = req;
         const cacheKey = `searchByUser:${userId}`;
         let search = await cache.get(cacheKey);

         if (!search) {
            search = await this.searchService.getSearchByUser(
               userId
            );
            if (search) {
               await cache.set(cacheKey, search);
            } else {
               await cache.set(cacheKey, null); // Cache the non-existence
            }
         }

         if (!search) {
            reply.code(404).send({ message: 'Search not found' });
         } else {
            reply.code(200).send(search);
         }
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   async updateSearch(req, reply) {
      try {
         const {
            server: { cache },
            query: { query, results }
         } = req;
         const search = await this.searchService.updateSearch(
            query,
            results
         );
         reply.code(200).send(search);
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   async deleteSearch(req, reply) {
      try {
         const {
            server: { cache },
            query: { query }
         } = req;
         const search = await this.searchService.deleteSearch(
            query
         );

         // Remove the search cache from the cache
         const cacheKey = `search:${query}`;
         await cache.del(cacheKey);

         reply.code(200).send(search);
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }
}

module.exports = SearchController;
