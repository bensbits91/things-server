const ThingService = require('../services/thingService');

class ThingController {
   constructor() {
      this.thingService = new ThingService();
   }

   async createThing(req, reply) {
      try {
         const { userId, detailId, name, rating, status, review, notes } =
            req.body;
         const thing = await this.thingService.createThing({
            userId: userId,
            name: name, // user-inputed name
            detail_id: detailId || null,
            rating: rating,
            status: status,
            review: review || '',
            notes: notes || ''
         });

         reply.code(201).send(thing);
      } catch (error) {
         console.log('\n\nbb ~ error in thingController:', error, '\n\n');
         reply.code(500).send({ message: error.message });
      }
   }

   async getThing(req, reply) {
      try {
         const {
            server: { cache },
            params: { id }
         } = req;
         const cacheKey = `thing:${id}`;
         let thing = await cache.get(cacheKey);

         if (!thing) {
            thing = await this.thingService.getThing(id);
            if (thing) {
               await cache.set(cacheKey, thing);
            } else {
               await cache.set(cacheKey, null); // Cache the non-existence
            }
         }

         if (!thing) {
            reply.code(404).send({ message: 'Thing not found' });
         } else {
            reply.code(200).send(thing);
         }
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   async getThingsByUser(req, reply) {
      try {
         const {
            server: { cache },
            query: { userId }
         } = req;
         const cacheKey = `thingsByUser:${userId}`;
         let things = await cache.get(cacheKey);
         console.log('bb ~ thingController.js ~ cacheKey:', cacheKey);
         console.log(
            'bb ~ thingController.js ~ things FROM CACHE:',
            things?.length
         );

         if (!things) {
            things = await this.thingService.getThingsByUserWithDetails(userId);
            console.log(
               'bb ~ thingController.js ~ things FROM DB:',
               things?.length
            );

            if (things) {
               await cache.set(cacheKey, things);
               console.log(
                  'bb ~ thingController.js ~ things ADDED TO CACHE:',
                  things?.length
               );
            } else {
               await cache.set(cacheKey, null); // Cache the non-existence
               console.log(
                  'bb ~ thingController.js ~ things NOT FOUND, NULLING IN CACHE!!'
               );
            }
         }

         if (!things) {
            reply.code(404).send({ message: 'Things not found' });
         } else {
            reply.code(200).send(things);
         }
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   async updateThing(req, reply) {
      try {
         const {
            server: { cache },
            params: { id },
            body
         } = req;
         const thing = await this.thingService.updateThing(id, body);
         if (!thing) {
            await cache.del(`thing:${id}`);
            reply.code(404).send({ message: 'Thing not found' });
         } else {
            await cache.set(`thing:${id}`, thing);
            reply.code(200).send(thing);
         }
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   async deleteThing(req, reply) {
      try {
         const {
            server: { cache },
            params: { id }
         } = req;
         const thing = await this.thingService.deleteThing(id);

         // Ensure the cache is updated to reflect the non-existence
         // OR Remove the item from the cache after successful deletion
         await cache.del(`thing:${id}`);

         if (!thing) {
            reply.code(404).send({ message: 'Thing not found' });
         } else {
            reply.code(204).send();
         }
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }
}

module.exports = ThingController;
