const SearchModel = require('../models/searchModel');
const { DuplicateKeyError, NotFoundError, ValidationError } = require('../errors/errors');

class SearchService {
   async createSearch(query, type, results) {
      if (!query || !type || !results) {
         throw new ValidationError('Missing required parameters');
      }
      try {
         const search = new SearchModel({ query, type, results });
         await search.save();
         return search;
      } catch (error) {
         throw error;
      }
   }

   async getSearch(query, type) {
      if (!query || !type) {
         throw new ValidationError('Missing required parameters');
      }
      try {
         return SearchModel.findOne({ query, type });
      } catch (error) {
         if (error.code === 404) {
            throw new NotFoundError('Search results not found');
         }
         throw error;
      }
   }

   async getSearchsByUser(userUuid) {
      if (!userUuid) {
         throw new ValidationError('userUuid is required');
      }
      try {
         return SearchModel.find({ userId });
      } catch (error) {
         if (error.code === 404) {
            throw new NotFoundError('Search results not found for user');
         }
         throw error;
      }
   }

   async updateSearch(query, type, results) {
      if (!query || !type || !results) {
         throw new ValidationError('Missing required parameters');
      }
      try {
         return SearchModel.findOneAndUpdate({ query, type }, { results }, { new: true });
      } catch (error) {
         if (error.code === 404) {
            throw new NotFoundError('Search results not found for update');
         }
         throw error;
      }
   }

   async deleteSearch(query, type) {
      if (!query || !type) {
         throw new ValidationError('Missing required parameters');
      }
      try {
         return SearchModel.findOneAndDelete({ query, type });
      } catch (error) {
         if (error.code === 404) {
            throw new NotFoundError('Search results not found for deletion');
         }
         throw error;
      }
   }
}

module.exports = SearchService;
