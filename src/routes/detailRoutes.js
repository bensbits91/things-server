const DetailController = require('../controllers/detailController');

const detailRoutes = async (fastify, options) => {
   const detailController = new DetailController();

   fastify.post('/detail', { preValidation: [fastify.authenticate] }, detailController.createDetail.bind(detailController));
   fastify.get('/detail/:id', { preValidation: [fastify.authenticate] }, detailController.getDetail.bind(detailController));
   fastify.get('/detail/external/:externalId', { preValidation: [fastify.authenticate] }, detailController.getDetailByExternalId.bind(detailController)); // New route
   // fastify.get('/detail', { preValidation: [fastify.authenticate] }, detailController.getDetailsByUser.bind(detailController));
   fastify.put('/detail/:id', { preValidation: [fastify.authenticate] }, detailController.updateDetail.bind(detailController));
   fastify.delete('/detail/:id', { preValidation: [fastify.authenticate] }, detailController.deleteDetail.bind(detailController));
};

module.exports = detailRoutes;