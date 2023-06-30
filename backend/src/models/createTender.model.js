const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { date } = require('joi');

const createTenderSchema = mongoose.Schema(
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
      documents:{
        type: File,
        required: true,
        trim: true,
      },
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
    }
);
createTenderSchema.plugin(toJSON);
createTenderSchema.plugin(paginate);

//@typedef CreateTender

const CreateTender= mongoose.model('CreateTender', userSchema);

module.exports = CreateTender;