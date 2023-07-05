
const Joi = require('joi');
const {objectId } = require('./custom.validation');

const createOffer = {
  body: Joi.object().keys({
    offer:Joi.number().required()
  }),
};
const updateOffer = {
  params: Joi.object().keys({
    offerId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      offer:Joi.number()
    })
    .min(1),
};
const getOffer = {
  params: Joi.object().keys({
    offerId: Joi.string().custom(objectId),
  }),
};
const deleteOffer = {
  params: Joi.object().keys({
    offerId: Joi.string().custom(objectId),
  }),
};
const getOffers = {
  query: Joi.object().keys({
    offer:Joi.number(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
module.exports = {
  createOffer,
  getOffer,
  deleteOffer,
  updateOffer,
  getOffers
};
