const StatusController = require('../controllers/statusController');


// this route enables clients to fetch the mapping of status codes to status texts
// e.g. to build a dropdown menu of statuses based on thing type

const statusRoutes = async (fastify, options) => {
   const statusController = new StatusController();

   fastify.get(
      '/statuses',
      { preValidation: [fastify.authenticate] },
      statusController.getStatusMap.bind(statusController)
   );
};

module.exports = statusRoutes;
