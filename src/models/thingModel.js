const mongoose = require('mongoose');

const thingSchema = new mongoose.Schema(
   {
      user_uuid: {
         type: String,
         required: true
      },
      name: {
         type: String,
         required: true
      },
      detail_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'details'
      },
      rating: { type: Number, min: 0, max: 10, default: 0 },
      status: { type: Number, enum: [0, 1, 2, 3, 4, 5, 6, 86], default: 0 }, // Numeric status for sorting
      times: { type: Number, default: 0 },
      tags: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tags'
         }
      ],
      review: { type: String, maxlength: 1000 },
      notes: { type: String, maxlength: 1000 },
      is_soft_deleted: { type: Boolean, default: false }
   },
   { timestamps: true }
);

thingSchema.index(
   {
      user_uuid: 1,
      detail_id: 1
   },
   { unique: true }
);

const Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;
