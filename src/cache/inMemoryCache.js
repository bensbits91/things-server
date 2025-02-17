const CacheInterface = require('./cacheInterface');

// todo: switch to a Redis cache by implementing a RedisCache class that adheres to the CacheInterface

class InMemoryCache extends CacheInterface {
   constructor() {
      super();
      this.cache = new Map();
   }

   async get(key) {
      return this.cache.get(key);
   }

   async set(key, value) {
      this.cache.set(key, value);
   }
}

module.exports = InMemoryCache;
