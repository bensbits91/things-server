const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema(
   {
      query: {
         type: String,
         required: true
      },
      type: {
         type: String,
         required: true
      },
      results: { // storing search results normalized
         type: Array, // todo: Should we have chlid schema? Should it be the detail schema?
         required: true
      }
   },
   { timestamps: true }
);

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;
