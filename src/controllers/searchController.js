const SearchService = require('../services/searchService');
const AggregatedService = require('../services/external/aggregatedService');

class SearchController {
   constructor() {
      this.searchService = new SearchService();
      this.aggregatedService = new AggregatedService();
   }

   async createSearch(req, reply) {
      try {
         const {
            server: { cache },
            body: { query, results }
         } = req;
         const search = await this.searchService.createSearch(query, results);

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
            query: { query, types }
         } = req;
         console.log('bb ~ searchController.js ~ req.query:', req.query);

         const normalizedTypes = /* types
            ? types.join(',').map(type => type.toLowerCase())
            :  */['tvshow', 'book', 'movie', 'videogame'];
         console.log('bb ~ searchController.js ~ normalizedTypes:', normalizedTypes);

         // const results = {};
         const results = [];

         for (const type of normalizedTypes) {
            console.log('bb ~ searchController.js ~ type:', type);
            const cacheKey = `search:${query}:${type}`;
            let typeResults = await cache.get(cacheKey);
            console.log(
               `bb ~ searchController.js ~ results FROM CACHE for ${type}:`,
               typeResults
            );

            if (!typeResults) {
               typeResults = await this.searchService.getSearch(query, type);
               console.log(
                  `bb ~ searchController.js ~ results FROM DB for ${type}:`,
                  typeResults
               );
               if (typeResults) {
                  await cache.set(cacheKey, typeResults);
               } else {
                  typeResults = await this.aggregatedService.search(query, type);
                  console.log(
                     `bb ~ searchController.js ~ results FROM AGGREGATED SEARCH for ${type}:`,
                     typeResults
                  );
                  await this.searchService.createSearch(query, type, typeResults);
                  await cache.set(cacheKey, typeResults);
               }
            }

            // results[type] = typeResults;
            results.push(...typeResults);
         }

         if (Object.keys(results).length === 0) {
            reply.code(404).send({ message: 'Search not found' });
         } else {
            reply.code(200).send(results);
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
         let results = await cache.get(cacheKey);

         if (!results) {
            results = await this.searchService.getSearchByUser(userId);
            if (results) {
               await cache.set(cacheKey, results);
            } else {
               await cache.set(cacheKey, null); // Cache the non-existence
            }
         }

         if (!results) {
            reply.code(404).send({ message: 'Search not found' });
         } else {
            reply.code(200).send(results);
         }
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   async updateSearch(req, reply) {
      try {
         const {
            server: { cache },
            body: { query, type, results }
         } = req;
         const search = await this.searchService.updateSearch(query, type, results);

         // Update the cache with the new search data
         const cacheKey = `search:${query}:${type}`;
         await cache.set(cacheKey, search);

         reply.code(200).send(search);
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   async deleteSearch(req, reply) {
      try {
         const {
            server: { cache },
            query: { query, type }
         } = req;
         const search = await this.searchService.deleteSearch(query, type);

         // Remove the search cache from the cache
         const cacheKey = `search:${query}:${type}`;
         await cache.del(cacheKey);

         reply.code(200).send(search);
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }
}

module.exports = SearchController;

// const SearchService = require('../services/searchService');
// const AggregatedService = require('../services/external/aggregatedService');

// // this file handles the logic for the search routes
// // it interacts with searchService to interact with the database
// // it interacts with aggregatedService to interact with the external APIs
// class SearchController {
//    constructor() {
//       this.searchService = new SearchService();
//       this.aggregatedService = new AggregatedService();
//    }

//    async createSearch(req, reply) {
//       try {
//          const {
//             server: { cache },
//             body: { query, results } // todo: will it be body? Is this a post or get?
//          } = req;
//          const search = await this.searchService.createSearch(query, results);

//          // Cache the newly created search cache
//          const cacheKey = `search:${query}`;
//          await cache.set(cacheKey, search);

//          reply.code(201).send(search);
//       } catch (error) {
//          reply.code(500).send({ message: error.message });
//       }
//    }

//    async getSearch(req, reply) {
//       // console.log('\n\nbb ~ searchController.js ~ req:', req, '\n\n');
//       try {
//          const {
//             server: { cache },
//             query: { query, types }
//          } = req;
//          // todo: need to include types in the cache key
//          // e.g. if we search 'lost' for 'tv show' and cache it, then search 'lost' for 'book', we'd currently get tv show results
//          // probably best to store 'search:lost:tv show' and 'search:lost:book' separately in the cache
//          // and db?
//          const cacheKey = `search:${query}`;
//          console.log('bb ~ searchController.js ~ cacheKey:', cacheKey);
//          console.log('bb ~ searchController.js ~ cache:', cache);
//          let results = await cache.get(cacheKey);
//          console.log('bb ~ searchController.js ~ results FROM CACHE:', results);

//          if (!results) {
//             results = await this.searchService.getSearch(query);
//             console.log('bb ~ searchController.js ~ results FROM DB:', results);
//             if (results) {
//                await cache.set(cacheKey, results);
//             } else {
//                results = await this.aggregatedService.search({
//                   query,
//                   types
//                });
//                console.log(
//                   'bb ~ searchController.js ~ results FROM AGGREGATED:',
//                   results
//                );
//                await this.searchService.createSearch(query, results);
//                await cache.set(cacheKey, results);
//             }
//          }

//          if (!results) {
//             reply.code(404).send({ message: 'Search not found' });
//          } else {
//             reply.code(200).send(results.results || results); // cached results are stored in a "results" property
//          }
//       } catch (error) {
//          reply.code(500).send({ message: error.message });
//       }
//    }

//    async getSearchByUser(req, reply) {
//       try {
//          const {
//             server: { cache },
//             query: { userId }
//          } = req;
//          const cacheKey = `searchByUser:${userId}`;
//          let results = await cache.get(cacheKey);

//          if (!results) {
//             results = await this.searchService.getSearchByUser(userId);
//             if (results) {
//                await cache.set(cacheKey, results);
//             } else {
//                await cache.set(cacheKey, null); // Cache the non-existence
//             }
//          }

//          if (!results) {
//             reply.code(404).send({ message: 'Search not found' });
//          } else {
//             reply.code(200).send(results);
//          }
//       } catch (error) {
//          reply.code(500).send({ message: error.message });
//       }
//    }

//    async updateSearch(req, reply) {
//       try {
//          const {
//             server: { cache },
//             query: { query, results }
//          } = req;
//          const search = await this.searchService.updateSearch(query, results);
//          reply.code(200).send(search);
//       } catch (error) {
//          reply.code(500).send({ message: error.message });
//       }
//    }

//    async deleteSearch(req, reply) {
//       try {
//          const {
//             server: { cache },
//             query: { query }
//          } = req;
//          const search = await this.searchService.deleteSearch(query);

//          // Remove the search cache from the cache
//          const cacheKey = `search:${query}`;
//          await cache.del(cacheKey);

//          reply.code(200).send(search);
//       } catch (error) {
//          reply.code(500).send({ message: error.message });
//       }
//    }
// }

// module.exports = SearchController;
