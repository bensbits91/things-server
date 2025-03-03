const StatusService = require('../services/statusService');

class StatusController {
   async getStatusMap(req, reply) {
      const statusMap = StatusService.getStatusMap();
      reply.send(statusMap);
   }
}

module.exports = StatusController;
