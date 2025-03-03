module.exports = async function createThing(req, reply) {
   const {
      userUuid,
      body: { detail_id, name, rating, status, review, notes },
      server: { cache }
   } = req;
   const thingData = {
      user_uuid: userUuid,
      name: name, // user-inputed name
      detail_id: detail_id || null,
      rating: rating || 0,
      status: status || 0,
      review: review || '',
      notes: notes || ''
   };
   const thingResponse = await this.thingService.createThing(thingData);
   const cacheKey = `thingsByUser:${userUuid}`;
   await cache.del(cacheKey);

   reply.header('X-Request-ID', req.id).code(201).send(thingResponse);
};
