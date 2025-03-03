const logger = require('../../utils/logger');

module.exports = async function updateThing(req, reply) {
   try {
      const {
         server: { cache },
         params: { id },
         body
      } = req;
      if (!id) {
         logger.error('thingController.js ~ ID is required for updating:', {
            requestId: req.id
         });
         reply
            .header('X-Request-ID', req.id)
            .code(400)
            .send({ message: 'ID is required' });
         return;
      }
      const thing = await this.thingService.updateThing(id, body);
      if (!thing) {
         await cache.del(`thing:${id}`);
         logger.error('thingController.js ~ Thing not found for updating:', {
            requestId: req.id
         });
         reply
            .header('X-Request-ID', req.id)
            .code(404)
            .send({ message: 'Thing not found' });
      } else {
         await cache.set(`thing:${id}`, thing);
         const { user_uuid } = thing;
         const cacheKey = `thingsByUser:${user_uuid}`;
         await cache.del(cacheKey);

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
