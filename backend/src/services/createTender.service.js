const httpStatus = require('http-status');
const {CreateTender}= require('../models')
const ApiError = require('../utils/ApiError');
const CreateTender = require('../models/createtender.model');

//@param {Object} userBody
 //@returns {Promise<CreateTender}

 //@param {Object} filter 
  //@param {Object} options 
 //@param {string} [options.sortBy] 
  //@param {number} [options.limit] 
  //@param {number} [options.page] 
// @returns {Promise<QueryResult>}

 const queryCreateTender = async (filter, options) => {
    const createTender = await CreateTender.paginate(filter, options);
    return createTender;
  };