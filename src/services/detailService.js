const Detail = require('../models/detailModel');

class DetailService {
   async createDetail(detailData) {
      const detail = new Detail(detailData);
      await detail.save();
      return detail;
   }

   async getDetail(id) {
      return Detail.findById(id);
   }

   async getDetailByExternalId(externalId) {
      return Detail.findOne({ external_id: externalId });
   }

   async updateDetail(id, updateData) {
      return Detail.findByIdAndUpdate(id, updateData, { new: true });
   }

   async deleteDetail(id) {
      return Detail.findByIdAndDelete(id);
   }
}

module.exports = DetailService;
