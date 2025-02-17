const Detail = require('../models/detailModel');

class DetailService {
   async createDetail(detailData) {
      console.log('\n\nbb ~ detailData:', detailData, '\n\n');
      const detail = new Detail(detailData);
      await detail.save();
      return detail;
   }

   async getDetail(id) {
      return Detail.findById(id);
   }

   // async getDetailsByUser(userId) {
   //    console.log('\n\nbb ~ detailService.js ~ userId:', userId, '\n\n');
   //    return Detail.find({ userId: userId });
   // }

   async updateDetail(id, updateData) {
      return Detail.findByIdAndUpdate(id, updateData, { new: true });
   }

   async deleteDetail(id) {
      return Detail.findByIdAndDelete(id);
   }
}

module.exports = DetailService;
