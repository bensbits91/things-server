const logger = require('../../utils/logger');

module.exports = async function getThing(req, reply) {
   try {
      const {
         server: { cache },
         params: { id }
      } = req;
      const cacheKey = `thing:${id}`;
      let thing = await cache.get(cacheKey);

      if (!thing) {
         thing = await this.thingService.getThing(id);
         if (thing) {
            await cache.set(cacheKey, thing);
         } else {
            await cache.set(cacheKey, null); // Cache the non-existence
         }
      }

      if (!thing) {
         logger.error('thingController.js ~ Thing not found:', { requestId: req.id });
         reply
            .header('X-Request-ID', req.id)
            .code(404)
            .send({ message: 'Thing not found' });
      } else {
         reply.header('X-Request-ID', req.id).code(200).send(thing);
      }
   } catch (error) {
      logger.error('thingController.js ~ Error finding thing:', {
         requestId: req.id,
         error: error.message || error
      });
      reply.header('X-Request-ID', req.id).code(500).send({ message: error.message });
   }
};
