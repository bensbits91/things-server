const mongoose = require('mongoose');
const { Status } = require('../src/models');

// Load environment variables
if (process.env.NODE_ENV === 'development') {
   require('dotenv').config({ path: '.env.local' });
} else {
   require('dotenv').config();
}

const statuses = [
   { code: 0, type: 'Book', text: 'Unset' },
   { code: 10, type: 'Book', text: 'Not read' },
   { code: 20, type: 'Book', text: 'Reading' },
   { code: 30, type: 'Book', text: 'Read' },
   { code: 40, type: 'Book', text: 'Reading again' },
   { code: 50, type: 'Book', text: 'Rereading' },
   { code: 60, type: 'Book', text: 'Read multiple times' },
   { code: 80, type: 'Book', text: 'Paused' },
   { code: 86, type: 'Book', text: 'Dropped' },

   { code: 0, type: 'Movie', text: 'Unset' },
   { code: 10, type: 'Movie', text: 'Not watched' },
   { code: 20, type: 'Movie', text: 'Watching' },
   { code: 30, type: 'Movie', text: 'Watched' },
   { code: 40, type: 'Movie', text: 'Rewatching after a break' },
   { code: 50, type: 'Movie', text: 'Rewatching' },
   { code: 60, type: 'Movie', text: 'Watched multiple times' },
   { code: 80, type: 'Movie', text: 'Paused' },
   { code: 86, type: 'Movie', text: 'Dropped' },

   { code: 0, type: 'TV Show', text: 'Unset' },
   { code: 10, type: 'TV Show', text: 'Not watched' },
   { code: 20, type: 'TV Show', text: 'Watching' },
   { code: 30, type: 'TV Show', text: 'Watched' },
   { code: 40, type: 'TV Show', text: 'Rewatching after a break' },
   { code: 50, type: 'TV Show', text: 'Rewatching' },
   { code: 60, type: 'TV Show', text: 'Watched multiple times' },
   { code: 80, type: 'TV Show', text: 'Paused' },
   { code: 86, type: 'TV Show', text: 'Dropped' },

   { code: 0, type: 'Video Game', text: 'Unset' },
   { code: 10, type: 'Video Game', text: 'Not played' },
   { code: 20, type: 'Video Game', text: 'Playing' },
   { code: 30, type: 'Video Game', text: 'Played' },
   { code: 40, type: 'Video Game', text: 'Replaying after a break' },
   { code: 50, type: 'Video Game', text: 'Replaying' },
   { code: 60, type: 'Video Game', text: 'Played multiple times' },
   { code: 80, type: 'Video Game', text: 'Paused' },
   { code: 86, type: 'Video Game', text: 'Dropped' }
];

const seedDatabase = async () => {
   try {
      const { DB_USER, DB_PW, DB_DOMAIN, DB_PROJECT } = process.env;

      const connectionString = `mongodb+srv://${DB_USER}:${DB_PW}@${DB_DOMAIN}.orplk.mongodb.net/?retryWrites=true&w=majority&appName=${DB_PROJECT}`;
      mongoose
         .connect(connectionString, {})
         .then(() => console.log('MongoDB connected'))
         .catch(e => console.log('MongoDB could not be connected due to ', e));

      // Replace old statuses with the new ones
      await Status.deleteMany({});
      console.log('Old statuses deleted');

      await Status.insertMany(statuses);
      console.log('New statuses inserted successfully');
   } catch (error) {
      console.error('Error inserting statuses:', error);
   } finally {
      mongoose.connection.close();
      console.log('Disconnected from database');
   }
};

seedDatabase();
