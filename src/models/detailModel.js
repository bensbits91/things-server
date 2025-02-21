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
      main_image_url: {
         type: String
      },
      country: {
         type: String
      },
      date: {
         type: String // todo: store as a date type?
      },
      language: {
         type: String
      },
      genres: {
         type: [String]
      },
      people: {
         type: [String]
      },
      external_id: {
         type: String
      },
      external_data: {
         type: mongoose.Schema.Types.Mixed
      }
   },
   { timestamps: true }
);

const Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;
