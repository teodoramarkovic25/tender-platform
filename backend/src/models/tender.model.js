const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const tenderSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description:{
        type: String,
        required: true,
        trim: true,
      },
      deadline:{
        type: Date,
        required: true,
        trim: true,
      },
      /*documents:{
        type: File,
        required: true,
        trim: true,
      },

       */
      criteria:{
        type: String,
        required: true,
        trim: true,
      },
      weightage:{
        type: Number,
        required: true,
        trim: true,
      }
    },
  {
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
  }
);

tenderSchema.virtual('offers', {
  ref: 'Offer',
  localField: '_id',
  foreignField: 'tender'
});

tenderSchema.plugin(toJSON);
tenderSchema.plugin(paginate);

const Tender = mongoose.model('Tender',tenderSchema  );


module.exports = Tender;
