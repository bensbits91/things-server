const logger = require('../../utils/logger');

module.exports = async function createThing(req, reply) {
   try {
      const { detailId, name, rating, status, review, notes } = req.body;
      const { userUuid } = req.user;
      const thing = await this.thingService.createThing({
         userUuid: userUuid,
         name: name, // user-inputed name
         detail_id: detailId || null,
         rating: rating,
         status: status,
         review: review || '',
         notes: notes || ''
      });

      reply.header('X-Request-ID', req.id).code(201).send(thing);
   } catch (error) {
      logger.error('thingController.js ~ Error in createThing:', {
         requestId: req.id,
         error: error.message || error
      });
      reply.header('X-Request-ID', req.id).code(500).send({ message: error.message });
   }
};
