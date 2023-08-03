const httpStatus = require('http-status');
const {Offer} = require('../models');
const ApiError = require('../utils/ApiError');

const createOffer = async (offerBody) => {
  return Offer.create(offerBody);
};

const queryOffers = async (filter, options) => {
  const offers = await Offer.paginate(filter, options);
  return offers;
};

const getOfferById = async (id) => {
  return Offer.findById(id);
};


const getOfferByCompany = async (companyName) => {
  return Offer.findOne({companyName})
};

const getOfferByTender = async (id) => {
  return Offer.find({id})
    .populate('tender', ['title', 'description', 'criteria', 'weightage'])
    .exec();
};


const updateOfferById = async (offerId, updateBody) => {
  const offer = await getOfferById(offerId);
  if (!offer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  }

  Object.assign(offer, updateBody);
  await offer.save();
  return offer;
};

const deleteOfferById = async (offerId) => {
  const offer = await getOfferById(offerId);
  if (!offer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  }
  await offer.remove();
  return offer;
};

module.exports = {
  createOffer,
  queryOffers,
  getOfferByTender,
  getOfferById,
  getOfferByCompany,
  updateOfferById,
  deleteOfferById
};
