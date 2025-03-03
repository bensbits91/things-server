const Detail = require('../models/detailModel');
const { DuplicateKeyError, NotFoundError, ValidationError } = require('../errors/errors');

class DetailService {
   async createDetail(detailData) {
      if (!detailData) {
         throw new ValidationError('detailData is required');
      }
      try {
         const detail = new Detail(detailData);
         await detail.save();
         return detail;
      } catch (error) {
         if (error.code === 11000) {
            console.error('\n\n\n\nDuplicate entry for type, name, and external_id combination');
            console.info('bb ~ detailService.js ~ detailData:', detailData, '\n\n\n\n');
            throw new DuplicateKeyError(
               'Duplicate entry for type, name, and external_id combination'
            );
         }
         throw error;
      }
   }

   async getDetail(id) {
      if (!id) {
         throw new ValidationError('ID is required');
      }
      try {
         return Detail.findById(id);
      } catch (error) {
         if (error.code === 404) {
            throw new NotFoundError('Detail not found');
         }
         throw error;
      }
   }

   async getDetailByExternalId(externalId) {
      if (!externalId) {
         throw new ValidationError('externalId is required');
      }
      try {
         return Detail.findOne({ external_id: externalId });
      } catch (error) {
         if (error.code === 404) {
            throw new NotFoundError('Detail not found');
         }
         throw error;
      }
   }

   async updateDetail(id, updateData) {
      if (!query || !type || !results) {
         throw new ValidationError('Missing required parameters');
      }
      try {
         return Detail.findByIdAndUpdate(id, updateData, { new: true });
      } catch (error) {
         if (error.code === 404) {
            throw new NotFoundError('Detail not found for update');
         }
         throw error;
      }
   }

   async deleteDetail(id) {
      if (!id) {
         throw new ValidationError('ID is required');
      }
      try {
         return Detail.findByIdAndDelete(id);
      } catch (error) {
         if (error.code === 404) {
            throw new NotFoundError('Detail not found for deletion');
         }
         throw error;
      }
   }
}

module.exports = DetailService;
