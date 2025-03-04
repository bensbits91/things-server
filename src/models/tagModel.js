const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true
      },
      description: { type: String },
      user_uuid: {
         type: String,
         default: 'things-community-moderator',
         required: true
      }
   },
   { timestamps: true }
);

tagSchema.index(
    {
       user_uuid: 1,
       name: 1
    },
    { unique: true }
 );

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
