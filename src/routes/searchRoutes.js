const SearchController = require('../controllers/searchController');

const searchRoutes = async (fastify, options) => {
   const searchController = new SearchController();

   fastify.post(
      '/search',
      { preValidation: [fastify.authenticate] },
      searchController.createSearch.bind(searchController)
   );
   // todo: this isn't working
   // need to (a) try cache, (b) try db, (c) if not found
   // perform a search and cache the results.....
   fastify.get(
      '/search',
      { preValidation: [fastify.authenticate] },
      searchController.getSearch.bind(searchController)
   );
   fastify.get(
      '/searchByUser',
      { preValidation: [fastify.authenticate] },
      searchController.getSearchByUser.bind(searchController)
   );
   fastify.put(
      '/search',
      { preValidation: [fastify.authenticate] },
      searchController.updateSearch.bind(searchController)
   );
   fastify.delete(
      '/search',
      { preValidation: [fastify.authenticate] },
      searchController.deleteSearch.bind(searchController)
   );
};

module.exports = searchRoutes;
