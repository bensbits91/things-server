const Thing = require('../models/thingModel');
const { DuplicateKeyError, NotFoundError, ValidationError } = require('../errors/errors');

class ThingService {
   async createThing(thingData) {
      if (!thingData) {
         throw new ValidationError('thingData is required');
      }
      try {
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
      if (!id) {
         throw new ValidationError('ID is required');
      }
      try {
         return Thing.findById(id);
      } catch {
         if (error.code === 404) {
            throw new NotFoundError('Thing not found');
         }
         throw error;
      }
   }

   async getThingsByUser(userUuid) {
      if (!userUuid) {
         throw new ValidationError('userUuid is required');
      }
      try {
         return Thing.find({ user_uuid: userUuid });
      } catch {
         if (error.code === 404) {
            throw new NotFoundError('Things not found for this user');
         }
         throw error;
      }
   }

   async getThingsByUserWithDetails(userUuid) {
      if (!userUuid) {
         throw new ValidationError('userUuid is required');
      }
      try {
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
      } catch {
         if (error.code === 404) {
            throw new NotFoundError('Things not found for this user');
         }
         throw error;
      }
   }

   async updateThing(id, updateData) {
      if (!id || !updateData) {
         throw new ValidationError('Missing required parameters');
      }
      try {
         return Thing.findByIdAndUpdate(id, updateData, { new: true });
      } catch {
         if (error.code === 404) {
            throw new NotFoundError('Thing not found');
         }
         throw error;
      }
   }

   async deleteThing(id) {
      if (!id) {
         throw new ValidationError('ID is required');
      }
      try {
         return Thing.findByIdAndDelete(id);
      } catch {
         if (error.code === 404) {
            throw new NotFoundError('Thing not found');
         }
         throw error;
      }
   }
}

module.exports = ThingService;
