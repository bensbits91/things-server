const logger = require('../../utils/logger');

module.exports = async function deleteSearch(req, reply) {
  try {
    const {
      server: { cache },
      query: { query, type }
    } = req;
    const search = await this.searchService.deleteSearch(query, type);

    // Remove the search cache from the cache
    const cacheKey = `search:${query}:${type}`;
    await cache.del(cacheKey);

    reply.header('X-Request-ID', req.id).code(200).send(search);
  } catch (error) {
    logger.error('Error deleting search', { requestId: req.id, error });
    reply.header('X-Request-ID', req.id).code(500).send({ message: error.message });
  }
};