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
         type: String,
         required: true
      },
      external_data: {
         type: mongoose.Schema.Types.Mixed
      }
   },
   { timestamps: true }
);

// Define a compound unique index to
// prevent a adding multiple details
// with the same extneral_id, name and type
detailSchema.index(
   {
      name: 1,
      type: 1,
      external_id: 1
   },
   { unique: true }
);

const Detail = mongoose.model('Detail', detailSchema);

// Ensure indexes are created
// Detail.on('index', error => {
//    if (error) {
//       console.error('Index creation failed:', error);
//    } else {
//       console.log('Indexes created successfully');
//    }
// });

module.exports = Detail;
