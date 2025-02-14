const mongoose = require('mongoose');

// Thing represents a user's instance of a movie, tv show, book, video game, or other thing
// including the user's status of the thing (e.g. watched, reading, playing, etc.)
// and the user's rating of the thing (or maybe this will be a separate collection)

const thingSchema = new mongoose.Schema(
   {
      userId: {
         type: String, // todo: this is the auth0Id of the user who owns the thing
         required: true
      },
      name: {
         type: String, // todo: if thing.id, then thing.name = tvShow.title or whatevs
         required: true
      },
      type: {
        type: String,
        Enumerator: ['movie', 'tvShow', 'book', 'video game', 'other'],
        default: 'other'
      },
      lookupId: {
         type: String, // todo: this is the unique identifier for the thing details
        //  unique: true
      },
   },
   { timestamps: true }
);

const Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;
