const SearchModel = require('../models/searchModel');

class SearchService {
   async createSearch(query, type, results) {
      const search = new SearchModel({ query, type, results });
      await search.save();
      return search;
   }

   async getSearch(query, type) {
      return SearchModel.findOne({ query, type });
   }

   async getSearchsByUser(userId) {
      return SearchModel.find({ userId });
   }

   async updateSearch(query, type, results) {
      return SearchModel.findOneAndUpdate({ query, type }, { results }, { new: true });
   }

   async deleteSearch(query, type) {
      return SearchModel.findOneAndDelete({ query, type });
   }
}

module.exports = SearchService;
