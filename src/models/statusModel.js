const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema(
   {
      code: { type: Number, required: true },
      type: { type: String, required: true }, // e.g., "Book", "Movie", etc.
      text: { type: String, required: true } // e.g. "To Watch", "Watching", etc.
   },
   { timestamps: true }
);

statusSchema.index({ code: 1, type: 1 }, { unique: true });

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
