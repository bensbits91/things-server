const DetailService = require('../services/detailService');

class DetailController {
   constructor() {
      this.detailService = new DetailService();
   }

   async createDetail(req, reply) {
      const { detail } = req.body;
      try {
         const detailResponse = await this.detailService.createDetail(detail);

         reply.code(201).send(detailResponse);
      } catch (error) {
         console.error('\n\nbb ~ error in detailController:', error, '\n\n');
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

   async getDetailByExternalId(req, reply) {
      try {
         const { externalId } = req.params;
         if (!externalId) {
            return reply.code(400).send({ message: 'externalId is required' });
         }
         const detail = await this.detailService.getDetailByExternalId(externalId);
         if (!detail) {
            return reply.code(404).send({ message: 'Detail not found' });
         }
         return reply.code(200).send(detail);
      } catch (error) {
         return reply.code(500).send({ message: error.message });
      }
   }

   async updateDetail(req, reply) {
      try {
         const detail = await this.detailService.updateDetail(req.params.id, req.body);
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
