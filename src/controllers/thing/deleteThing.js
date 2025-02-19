const logger = require('../../utils/logger');

module.exports = async function deleteThing(req, reply) {
   try {
      const {
         server: { cache },
         params: { id }
      } = req;
      const thing = await this.thingService.deleteThing(id);

      // Ensure the cache is updated to reflect the non-existence
      await cache.del(`thing:${id}`);

      if (!thing) {
         logger.error('thingController.js ~ Thing not found for deletion:', {
            requestId: req.id
         });
         reply
            .header('X-Request-ID', req.id)
            .code(404)
            .send({ message: 'Thing not found' });
      } else {
         reply.header('X-Request-ID', req.id).code(204).send();
      }
   } catch (error) {
      logger.error('thingController.js ~ Error deleting thing:', {
         requestId: req.id,
         error: error.message || error
      });
      reply.header('X-Request-ID', req.id).code(500).send({ message: error.message });
   }
};
