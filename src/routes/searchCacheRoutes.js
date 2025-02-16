const SearchCacheController = require('../controllers/searchCacheController');

const searchCacheRoutes = async (fastify, options) => {
   const searchCacheController = new SearchCacheController();

   fastify.post(
      '/searchCaches',
      { preValidation: [fastify.authenticate] },
      searchCacheController.createSearchCache.bind(searchCacheController)
   );
   fastify.get(
      '/searchCaches',
      { preValidation: [fastify.authenticate] },
      searchCacheController.getSearchCache.bind(searchCacheController)
   );
   fastify.get(
      '/searchCachesByUser',
      { preValidation: [fastify.authenticate] },
      searchCacheController.getSearchCachesByUser.bind(searchCacheController)
   );
   fastify.put(
      '/searchCaches',
      { preValidation: [fastify.authenticate] },
      searchCacheController.updateSearchCache.bind(searchCacheController)
   );
   fastify.delete(
      '/searchCaches',
      { preValidation: [fastify.authenticate] },
      searchCacheController.deleteSearchCache.bind(searchCacheController)
   );
};

module.exports = searchCacheRoutes;
