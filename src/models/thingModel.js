const mongoose = require('mongoose');

const thingSchema = new mongoose.Schema(
   {
      userUuid: {
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
      status: { type: Number, enum: [-1, 0, 1], default: 0 }, // Numeric status for sorting
      review: { type: String, maxlength: 1000 },
      notes: { type: String, maxlength: 1000 },
      isSoftDeleted: { type: Boolean, default: false }
   },
   { timestamps: true }
);

const Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;
