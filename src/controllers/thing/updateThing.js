const logger = require('../../utils/logger');

module.exports = async function updateThing(req, reply) {
   try {
      const {
         server: { cache },
         params: { _id },
         body
      } = req;
      const thing = await this.thingService.updateThing(_id, body);
      if (!thing) {
         await cache.del(`thing:${_id}`);
         logger.error('thingController.js ~ Thing not found for updating:', {
            requestId: req.id
         });
         reply
            .header('X-Request-ID', req.id)
            .code(404)
            .send({ message: 'Thing not found' });
      } else {
         await cache.set(`thing:${_id}`, thing);
         reply.header('X-Request-ID', req.id).code(200).send(thing);
      }
   } catch (error) {
      logger.error('thingController.js ~ Error updating thing:', {
         requestId: req.id,
         error: error.message || error
      });
      reply.header('X-Request-ID', req.id).code(500).send({ message: error.message });
   }
};
