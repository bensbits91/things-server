const logger = require('../../utils/logger');

module.exports = async function getSearchByUser(req, reply) {
   const {
      server: { cache },
      user: { userUuid }
   } = req;
   const cacheKey = `searchByUser:${userUuid}`;
   let results = await cache.get(cacheKey);

   if (!results) {
      results = await this.searchService.getSearchByUser(userUuid);
      if (results) {
         await cache.set(cacheKey, results);
      } else {
         await cache.set(cacheKey, null); // Cache the non-existence
      }
   }

   //  if (!results) {
   //     logger.error('Search not found', { requestId: req.id });
   //     reply
   //        .header('X-Request-ID', req.id)
   //        .code(404)
   //        .send({ message: 'Search not found' });
   //  } else {
   reply.header('X-Request-ID', req.id).code(200).send(results);
   //  }
};
