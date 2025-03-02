const Thing = require('../models/thingModel');
const { DuplicateKeyError, NotFoundError, ValidationError } = require('../errors/errors');

class ThingService {
   async createThing(thingData) {
      console.log('\n\n\n\nbb ~ thingService.js ~ thingData:', thingData, '\n\n\n\n');
      if (!thingData) {
         throw new ValidationError('thingData is required');
      }
      try {
         const thing = new Thing(thingData);
         await thing.save();
         return thing;
      } catch (error) {
         console.log('\n\n\n\nbb ~ thingService.js ~ error.code:', error.code);
         console.log('bb ~ thingService.js ~ error:', error, '\n\n\n\n');
         if (error.code === 11000) {
            throw new DuplicateKeyError(
               'Duplicate entry for user_uuid, name, and detail_id combination'
            );
         }
         throw error;
      }
   }

   async getThing(_id) {
      if (!_id) {
         throw new ValidationError('ID is required');
      }
      try {
         return Thing.findById(_id);
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
         const statusMap = {
            Book: {
               '-1': 'Dropped',
               0: 'Not read',
               1: 'Reading',
               2: 'Read'
            },
            Movie: {
               '-1': 'Dropped',
               0: 'Not watched',
               1: 'Watching',
               2: 'Watched'
            },
            'TV Show': {
               '-1': 'Dropped',
               0: 'Not watched',
               1: 'Watching',
               2: 'Watched'
            },
            'Video Game': {
               '-1': 'Dropped',
               0: 'Not played',
               1: 'Playing',
               2: 'Played'
            }
         };
         const mapStatusToText = (status, type) => statusMap[type][status];

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
         ]).then(results => {
            return results.map(thing => {
               if (thing.details && thing.details.length > 0) {
                  const detail = thing.details[0];
                  const {
                     name,
                     type,
                     external_id,
                     country,
                     date,
                     description,
                     genres,
                     language,
                     main_image_url,
                     people
                  } = detail;
                  thing.detailName = name;
                  thing.type = type;
                  thing.external_id = external_id;
                  thing.country = country;
                  thing.date = date;
                  thing.description = description;
                  thing.genres = genres;
                  thing.language = language;
                  thing.main_image_url = main_image_url;
                  thing.people = people;
                  thing.statusText = mapStatusToText(thing.status, type);
               }
               return thing;
            });
         });
         return things;
      } catch {
         if (error.code === 404) {
            throw new NotFoundError('Things not found for this user');
         }
         throw error;
      }
   }

   async updateThing(_id, updateData) {
      if (!_id || !updateData) {
         throw new ValidationError('Missing required parameters');
      }
      try {
         return Thing.findByIdAndUpdate(_id, updateData, { new: true });
      } catch {
         if (error.code === 404) {
            throw new NotFoundError('Thing not found');
         }
         throw error;
      }
   }

   async deleteThing(_id) {
      if (!_id) {
         throw new ValidationError('ID is required');
      }
      try {
         return Thing.findByIdAndDelete(_id);
      } catch {
         if (error.code === 404) {
            throw new NotFoundError('Thing not found');
         }
         throw error;
      }
   }
}

module.exports = ThingService;
