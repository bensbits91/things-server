const SearchService = require('../services/searchService');
const AggregatedService = require('../services/external/aggregatedService');
const {
   createSearch,
   getSearch,
   getSearchByUser,
   updateSearch,
   deleteSearch
} = require('./search');

class SearchController {
   constructor() {
      this.searchService = new SearchService();
      this.aggregatedService = new AggregatedService();
   }

   async createSearch(req, reply) {
      return createSearch.call(this, req, reply);
   }

   async getSearch(req, reply) {
      return getSearch.call(this, req, reply);
   }

   async getSearchByUser(req, reply) {
      return getSearchByUser.call(this, req, reply);
   }

   async updateSearch(req, reply) {
      return updateSearch.call(this, req, reply);
   }

   async deleteSearch(req, reply) {
      return deleteSearch.call(this, req, reply);
   }
}

module.exports = SearchController;
