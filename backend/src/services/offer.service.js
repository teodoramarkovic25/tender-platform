const httpStatus=require('http-status');
const {Offer}=require('../models');
const ApiError=require('../utils/ApiError');

/**
 * Create an offer
 * @param offerBody
 * @returns {Promise<Offer>}
 */
const createOffer=async (offerBody)=>{
  return Offer.create(offerBody);
}

/**
 *
 * @param filter
 * @param options
 * @returns {Promise<*>}
 */
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOffers = async (filter, options) => {
  const offers = await Offer.paginate(filter, options);
  return offers;
};


module.exports={
  createOffer,

}
