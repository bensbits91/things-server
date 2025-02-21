const logger = require('../../utils/logger');

module.exports = async function createThing(req, reply) {
   try {
      const {
         userUuid,
         body: { detail_id, name, rating, status, review, notes },
         server: { cache }
      } = req;
      console.log('bb ~ createThing.js ~ userUuid:', userUuid);
      console.log(
         'bb ~ createThing.js ~ { detail_id, name, rating, status, review, notes }:',
         { detail_id, name, rating, status, review, notes }
      );
      const thingData = {
         user_uuid: userUuid,
         name: name, // user-inputed name
         detail_id: detail_id || null,
         rating: rating || 0,
         status: status || 0,
         review: review || '',
         notes: notes || ''
      };
      console.log('\n\n\nbb ~ createThing.js ~ thingData:', thingData, '\n\n\n');
      const thingResponse = await this.thingService.createThing(thingData);
      const cacheKey = `thingsByUser:${userUuid}`;
      await cache.del(cacheKey);

      reply.header('X-Request-ID', req.id).code(201).send(thingResponse);
   } catch (error) {
      if (error.code === 11000) {
         // MongoDB duplicate key error code
         logger.error('thingController.js ~ Duplicate key error in createThing:', {
            requestId: req.id,
            error: error.message || error
         });
         reply
            .header('X-Request-ID', req.id)
            .code(409)
            .send({
               message: 'Duplicate entry for user_uuid, name, and detail_id combination'
            });
      } else {
         logger.error('thingController.js ~ Error in createThing:', {
            requestId: req.id,
            error: error.message || error
         });
         reply.header('X-Request-ID', req.id).code(500).send({ message: error.message });
      }
   }
};
