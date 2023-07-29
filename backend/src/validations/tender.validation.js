const Joi = require('joi');
const {password, objectId} = require('./custom.validation');

const createTender = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    deadline: Joi.date().required(),
   // documents: Joi.binary().required(),
    criteria: Joi.string().required(),
    weightage: Joi.number().required(),

  }),
};
const updateTender = {
  params: Joi.object().keys({
    tenderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      deadline: Joi.date(),
      //documents: Joi.binary(),
      criteria: Joi.string(),
      weightage: Joi.number(),
    })
    .min(1),
};


const getTender = {
  params: Joi.object().keys({
    tenderId: Joi.string().custom(objectId),
  }),
};


const deleteTender = {
  params: Joi.object().keys({
    tenderId: Joi.string().custom(objectId),
  }),
};

const getTenders = {
  query: Joi.object().keys({
    //name: Joi.string(),
   // role: Joi.string(),
    dateFrom: Joi.date(),
    dateTo: Joi.date(),
    weightageFrom:Joi.number(),
    weightageTo:Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};


module.exports = {
  createTender,
  getTender,
  deleteTender,
  updateTender,
  getTenders
};
