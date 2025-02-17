const DetailService = require('../services/detailService');

class DetailController {
   constructor() {
      this.detailService = new DetailService();
   }

   async createDetail(req, reply) {
      console.log('\n\nbb ~ req in detailController:', req, '\n\n');
      try {
         const detail = await this.detailService.createDetail({
            name: req.body.name,
            type: req.body.type,
            description: req.body.description || '',
            mainImageUrl: req.body.mainImageUrl || '',
            externalId: req.body.externalId,
            externalData: req.body.externalData,
         });

         reply.code(201).send(detail);
      } catch (error) {
         console.log('\n\nbb ~ error in detailController:', error, '\n\n');
         reply.code(500).send({ message: error.message });
      }
   }

   async getDetail(req, reply) {
      try {
         const detail = await this.detailService.getDetail(req.params.id);
         if (!detail) {
            reply.code(404).send({ message: 'Detail not found' });
         } else {
            reply.code(200).send(detail);
         }
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   // async getDetailsByUser(req, reply) {
   //    try {
   //       const { userId } = req.query;
   //       console.log('bb ~ detailController.js ~ userId:', userId);
   //       const details = await this.detailService.getDetailsByUser(userId);
   //       console.log('bb ~ detailController.js ~ details:', details);
   //       if (!details) {
   //          reply.code(404).send({ message: 'Details not found' });
   //       } else {
   //          reply.code(200).send(details);
   //       }
   //    } catch (error) {
   //       reply.code(500).send({ message: error.message });
   //    }
   // }

   async updateDetail(req, reply) {
      try {
         const detail = await this.detailService.updateDetail(
            req.params.id,
            req.body
         );
         if (!detail) {
            reply.code(404).send({ message: 'Detail not found' });
         } else {
            reply.code(200).send(detail);
         }
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }

   async deleteDetail(req, reply) {
      try {
         const detail = await this.detailService.deleteDetail(req.params.id);
         if (!detail) {
            reply.code(404).send({ message: 'Detail not found' });
         } else {
            reply.code(204).send();
         }
      } catch (error) {
         reply.code(500).send({ message: error.message });
      }
   }
}

module.exports = DetailController;
