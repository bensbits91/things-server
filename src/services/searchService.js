const Search = require('../models/searchModel');

class SearchService {
   async createSearch(query, results) {
      const search = new Search({ query, results });
      await search.save();
      return search;
   }

   async getSearch(query) {
      return Search.findOne({ query });
   }

   async getSearchsByUser(userId) {
      return Search.find({ userId });
   }

   async updateSearch(query, results) {
      return Search.findOneAndUpdate(
         { query },
         { results },
         { new: true }
      );
   }

   async deleteSearch(query) {
      return Search.findOneAndDelete({ query });
   }
}

module.exports = SearchService;
