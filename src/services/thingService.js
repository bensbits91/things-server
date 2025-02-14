const Thing = require('../models/thingModel');

class ThingService {
   async createThing(thingData) {
      console.log('\n\nbb ~ thingData:', thingData, '\n\n');
      const thing = new Thing(thingData);
      await thing.save();
      return thing;
   }

   async getThing(id) {
      return Thing.findById(id);
   }

   async getThingsByUser(userId) {
      console.log('\n\nbb ~ thingService.js ~ userId:', userId, '\n\n');
      return Thing.find({ userId: userId });
   }

   async updateThing(id, updateData) {
      return Thing.findByIdAndUpdate(id, updateData, { new: true });
   }

   async deleteThing(id) {
      return Thing.findByIdAndDelete(id);
   }
}

module.exports = ThingService;
