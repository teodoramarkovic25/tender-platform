const httpStatus = require('http-status');
const {Tender} = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Tender
 * @param {Object} tenderBody
 * @returns {Promise<Tender>}
 */
const createTender = async (tenderBody) => {
  return Tender.create(tenderBody);
};

/**
 * Query for tenders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTenders = async (filter, options) => {
  const tenders = await Tender.paginate(filter, options);
  return tenders;
};

/**
 * Get tender by id
 * @param {ObjectId} id
 * @returns {Promise<Tender>}
 */
const getTenderById = async (id) => {
  return Tender.findById(id);
};


/**
 * Update tender by id
 * @param {ObjectId} tenderId
 * @param {Object} updateBody
 * @returns {Promise<Tender>}
 */
const updateTenderById = async (tenderId, updateBody) => {
  const tender = await getTenderById(tenderId);
  if (!tender) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tender not found');
  }

  Object.assign(tender, updateBody);
  await tender.save();
  return tender;
};

/**
 * Delete tender by id
 * @param {ObjectId} tenderId
 * @returns {Promise<Tender>}
 */
const deleteTenderById = async (tenderId) => {
  const tender = await getTenderById(tenderId);
  if (!tender) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tender not found');
  }
  await tender.remove();
  return tender;
};

/**
* Get count of active tenders
* @returns : {Promise<Number>}
* */
const getActiveCount = async () =>{
  const number = await Tender.countDocuments({deadline : {$gt: new Date()}});
  return number;
}

const getInactiveCount = async () =>{
  const number = await Tender.countDocuments({deadline : {$lte: new Date()}});
  return number;
}

const getChartData = async () =>{
  let currentYear = (new Date).getFullYear();
  const collection = await Tender.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${currentYear}-01-01`),
          $lt: new Date(`${currentYear + 1}-01-01`)
        }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        _id: 1
      }
    }
  ]);
  return collection;
}
module.exports = {
  createTender,
  queryTenders,
  getTenderById,
  updateTenderById,
  deleteTenderById,
  getActiveCount,
  getInactiveCount,
  getChartData,
};

