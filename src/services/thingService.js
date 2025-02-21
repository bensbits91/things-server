const Thing = require('../models/thingModel');
const { DuplicateKeyError } = require('../errors/errors');

class ThingService {
   async createThing(thingData) {
      try {
         console.log('\n\nbb ~ thingData:', thingData, '\n\n');
         const thing = new Thing(thingData);
         await thing.save();
         return thing;
      } catch (error) {
         if (error.code === 11000) {
            throw new DuplicateKeyError(
               'Duplicate entry for user_uuid, name, and detail_id combination'
            );
         }
         throw error;
      }
   }

   async getThing(id) {
      return Thing.findById(id);
   }

   async getThingsByUser(userUuid) {
      console.log('\n\n\nbb ~ thingService.js ~ userUuid:', userUuid, '\n\n\n');
      return Thing.find({ user_uuid: userUuid });
   }

   async getThingsByUserWithDetails(userUuid) {
      const things = await Thing.aggregate([
         { $match: { user_uuid: userUuid } },
         {
            $lookup: {
               from: 'details',
               localField: 'detail_id',
               foreignField: '_id',
               as: 'details'
            }
         }
      ]);

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
