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
      // todo: is this needed?
      console.log('\n\nbb ~ thingService.js ~ userId:', userId, '\n\n');
      return Thing.find({ userId: userId });
   }

   async getThingsByUserWithDetails(userId) {
      const things = await Thing.aggregate([
         { $match: { userId: userId } },
         {
            $lookup: {
               from: 'details',
               localField: 'detail_id',
               foreignField: '_id',
               as: 'details'
            }
         }
      ]);

      console.log(
         'Aggregated Things with Details:',
         JSON.stringify(things, null, 2)
      );
      return things;
   }

   async updateThing(id, updateData) {
      return Thing.findByIdAndUpdate(id, updateData, { new: true });
   }

   async deleteThing(id) {
      return Thing.findByIdAndDelete(id);
   }
}

module.exports = ThingService;
