const mongoose = require('mongoose');

const searchCacheSchema = new mongoose.Schema(
   {
      query: {
         type: String,
         required: true
      },
      results: {
         type: Array,
         required: true
      }
   },
   { timestamps: true }
);

const SearchCache = mongoose.model('SearchCache', searchCacheSchema);

module.exports = SearchCache;
