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
  return Offer.findById(id)
    .populate('tenders', ['title', 'description', 'criteria', 'weightage'])
    .populate('createdBy', ['firstName', 'lastName', 'email', 'company', 'createdAt'])
    .exec();
};

const getOfferByCompany = async (companyName) => {
  return Offer.findOne({companyName})
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

const getCount = async () =>{
  const number = await Offer.countDocuments({});
  return number
};

module.exports = {
  createOffer,
  queryOffers,
  getOfferById,
  getOfferByCompany,
  updateOfferById,
  deleteOfferById,
  getCount,
};
