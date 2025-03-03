const Status = require('../models/statusModel');

let statusMap = {};

class StatusService {
   static async loadStatuses() {
      const statuses = await Status.find();
      statusMap = statuses.reduce((acc, { code, text, type }) => {
         if (!acc[type]) acc[type] = {};
         acc[type][code] = text;
         return acc;
      }, {});
   }

   static getStatusMap = () => statusMap;
}

module.exports = StatusService;
