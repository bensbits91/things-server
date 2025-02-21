const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const fastifyCors = require('@fastify/cors');
const cachePlugin = require('./plugins/cachePlugin');
const requestIdMiddleware = require('./plugins/requestIdMiddleware');
const authMiddleware = require('./utils/authMiddleware');
const { detailRoutes, thingRoutes, searchRoutes } = require('./routes');
const errorHandler = require('./utils/errorHandler');

// Load environment variables
if (process.env.NODE_ENV === 'development') {
   require('dotenv').config({ path: '.env.local' });
} else {
   require('dotenv').config();
}
const { DB_USER, DB_PW, DB_DOMAIN, DB_PROJECT } = process.env;

mongoose.set('strictQuery', true); // todo: what does this do? Should it be false?

// Connect to MongoDB Atlas
const connectionString = `mongodb+srv://${DB_USER}:${DB_PW}@${DB_DOMAIN}.orplk.mongodb.net/?retryWrites=true&w=majority&appName=${DB_PROJECT}`;
console.log('bb ~ index.js ~ connectionString:', connectionString);
mongoose
   .connect(connectionString, {})
   .then(() => console.log('MongoDB connected'))
   .catch(e => console.log('MongoDB could not be connected due to ', e));

// Register the error handler
fastify.setErrorHandler(errorHandler);

// Register the cache plugin
fastify.register(cachePlugin);

// Register the request ID middleware
fastify.register(requestIdMiddleware);

// Register CORS
fastify.register(fastifyCors, {
   origin: ['http://localhost:3001' /* , 'http://your-other-origin.com' */], // Allow requests from these origins
   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
   allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
   credentials: true // Allow credentials (cookies, authorization headers, etc.)
});

// Register models
require('./models');

// Register JWT middleware
authMiddleware(fastify);

// Register routes
fastify.register(thingRoutes);
fastify.register(detailRoutes);
fastify.register(searchRoutes);

// Launch server at port : 3000 in local environment
fastify.listen({ port: process.env.PORT || 3000 }, err => {
   if (err) {
      fastify.log.error(err);
      process.exit(1);
   }
   console.log(`Server running at ${fastify.server.address().port}`);
});
