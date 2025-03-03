const logger = require('../../utils/logger');

module.exports = async function getThingsByUser(req, reply) {
   // try {
   const {
      id,
      server: { cache },
      userUuid
   } = req;
   const cacheKey = `thingsByUser:${userUuid}`;
   let things = await cache.get(cacheKey);
   logger.info('getThingsByUser.js ~ Things by user FROM CACHE:', {
      requestId: id,
      userUuid,
      count: things?.length || 0
   });

   if (!things) {
      things = await this.thingService.getThingsByUserWithDetails(userUuid);
      logger.info('getThingsByUser.js ~ Things by user FROM DB:', {
         requestId: id,
         userUuid,
         count: things?.length || 0
      });
      if (things) {
         await cache.set(cacheKey, things);
      } else {
         await cache.set(cacheKey, null); // Cache the non-existence // todo: do we want this here???
      }
   }

   // if (!things) throw new NotFoundError('Things not found for this user');

   // if (!things) { // todo: throw custom 404
   //    logger.error('getThingsByUser.js ~ Things by user not found:', {
   //       requestId: id
   //    });
   //    reply.header('X-Request-ID', id).code(404).send({ message: 'Things not found' });
   // } else {
   reply.header('X-Request-ID', id).code(200).send(things);
   // }
   // } catch (error) {
   //    logger.error('getThingsByUser.js ~ Error getting things by user:', {
   //       requestId: id,
   //       error: error.message || error
   //    });
   //    reply.header('X-Request-ID', id).code(500).send({ message: error.message });
   // }
};
