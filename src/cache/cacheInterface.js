class CacheInterface {
   async get(key) {
      throw new Error('Method not implemented');
   }

   async set(key, value) {
      throw new Error('Method not implemented');
   }

   async del(key) {
      throw new Error('Method not implemented');
   }

   async flush() {
      throw new Error('Method not implemented');
   }
}

module.exports = CacheInterface;
