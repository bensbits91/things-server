const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema(
   {
      name: {
         type: String, // todo: if thing.id, then thing.name = tvShow.title or whatevs
         required: true
      },
      type: {
         type: String,
         Enumerator: ['Movie', 'TV Show', 'Book', 'Video Game', 'other'],
         required: true
         // default: 'other'
      },
      description: {
         type: String
      },
      mainImageUrl: {
         type: String
      },
      externalId: {
         type: String
      },
      externalData: {
         type: mongoose.Schema.Types.Mixed
      }
   },
   { timestamps: true }
);

const Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;
