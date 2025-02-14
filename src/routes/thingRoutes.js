const ThingController = require('../controllers/thingController');

const thingRoutes = async (fastify, options) => {
   const thingController = new ThingController();

   fastify.post('/things', { preValidation: [fastify.authenticate] }, thingController.createThing.bind(thingController));
   fastify.get('/things/:id', { preValidation: [fastify.authenticate] }, thingController.getThing.bind(thingController));
   fastify.get('/things', { preValidation: [fastify.authenticate] }, thingController.getThingsByUser.bind(thingController));
   fastify.put('/things/:id', { preValidation: [fastify.authenticate] }, thingController.updateThing.bind(thingController));
   fastify.delete('/things/:id', { preValidation: [fastify.authenticate] }, thingController.deleteThing.bind(thingController));
};

module.exports = thingRoutes;