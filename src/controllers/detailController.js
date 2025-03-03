const DetailService = require('../services/detailService');

class DetailController {
   constructor() {
      this.detailService = new DetailService();
   }

   async createDetail(req, reply) {
      const { detail } = req.body;
      const detailResponse = await this.detailService.createDetail(detail);
      reply.code(201).send(detailResponse);
   }

   async getDetail(req, reply) {
      const detail = await this.detailService.getDetail(req.params.id);
      reply.code(200).send(detail);
   }

   async getDetailByExternalId(req, reply) {
      const { externalId } = req.params;
      const detail = await this.detailService.getDetailByExternalId(externalId);
      return reply.code(200).send(detail);
   }

   async updateDetail(req, reply) {
      const detail = await this.detailService.updateDetail(req.params.id, req.body);
      reply.code(200).send(detail);
   }

   async deleteDetail(req, reply) {
      const detail = await this.detailService.deleteDetail(req.params.id);
      reply.code(204).send();
   }
}

module.exports = DetailController;
