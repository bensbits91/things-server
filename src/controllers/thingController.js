const ThingService = require('../services/thingService');

class ThingController {
   constructor() {
      this.thingService = new ThingService();
   }

   async createThing(req, reply) {
      console.log('\n\nbb ~ req in thingController:', req, '\n\n');
      try {
         const { userId, thingId, name, rating, status, review, notes } =
            req.body;
         const thing = await this.thingService.createThing({
            userId: userId,
            name: name, // user-inputed name
            detail_id: thingId || null,
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
         const thing = await this.thingService.getThing(req.params.id);
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
         const { userId } = req.query;
         console.log('bb ~ thingController.js ~ userId:', userId);
         // todo: do I need an option to get thigs without details?
         const things = await this.thingService.getThingsByUserWithDetails(userId);
         console.log('bb ~ thingController.js ~ things:', things);
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
         const thing = await this.thingService.updateThing(
            req.params.id,
            req.body
         );
         if (!thing) {
            reply.code(404).send({ message: 'Thing not found' });
         } else {
            reply.code(200).send(thing);
         }
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   async deleteThing(req, reply) {
      try {
         const thing = await this.thingService.deleteThing(req.params.id);
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
