const SearchCache = require('../models/searchCacheModel');

class SearchCacheService {
   async createSearchCache(query, results) {
      const searchCache = new SearchCache({ query, results });
      await searchCache.save();
      return searchCache;
   }

   async getSearchCache(query) {
      return SearchCache.findOne({ query });
   }

   async getSearchCachesByUser(userId) {
      return SearchCache.find({ userId });
   }

   async updateSearchCache(query, results) {
      return SearchCache.findOneAndUpdate(
         { query },
         { results },
         { new: true }
      );
   }

   async deleteSearchCache(query) {
      return SearchCache.findOneAndDelete({ query });
   }
}

module.exports = SearchCacheService;
