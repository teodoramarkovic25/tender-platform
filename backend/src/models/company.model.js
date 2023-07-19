const mongoose = require('mongoose');
const {toJSON, paginate} = require('./plugins');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required!'],
    trim: true,
    minlength: 3,
  },
  businessType: {
    type: String,
    required: [true, 'Business type is required!'],
    trim: true,
    minlength: 3
  },
  address: {
    type: String,
    required: [true, 'Address is required!'],
    trim: true,
    minlength: 3
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required!'],
    trim: true,
    minlength: 9
  },
  website: {
    type: String,
    required: [true, 'Phone number is required!'],
    trim: true
  },
  companySize: {
    type: Number,
    required: [true, 'Phone number is required!'],
    trim: true,
    minlength: 9
  }

});


companySchema.plugin(toJSON);
companySchema.plugin(paginate);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;

