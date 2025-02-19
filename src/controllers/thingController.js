const ThingService = require('../services/thingService');
const {
   createThing,
   getThing,
   getThingsByUser,
   updateThing,
   deleteThing
} = require('./thing');

class ThingController {
   constructor() {
      this.thingService = new ThingService();
   }

   async createThing(req, reply) {
      return createThing.call(this, req, reply);
   }

   async getThing(req, reply) {
      return getThing.call(this, req, reply);
   }

   async getThingsByUser(req, reply) {
      return getThingsByUser.call(this, req, reply);
   }

   async updateThing(req, reply) {
      return updateThing.call(this, req, reply);
   }

   async deleteThing(req, reply) {
      return deleteThing.call(this, req, reply);
   }
}

module.exports = ThingController;
