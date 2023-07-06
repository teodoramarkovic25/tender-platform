const httpStatus = require('http-status');
const { Evaluation } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a evaluation
 * @param {Object} evaluationBody
 * @returns {Promise<evaluation>}
 */
const evaluationUser = async (evaluationBody) => {
  if (await Evaluation.isEmailTaken(evaluationBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Evaluation.create(evaluationBody);
};
/**
 * Create a evaluation
 * @param {Object} evaluationBody
 * @returns {Promise<Evaluation>}
 */
const createEvaluation= async (evaluationBody) => {
  return Evaluation.create(evaluationBody);
};


/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryEvaluation = async (filter, options) => {
  const evaluation = await Evaluation.paginate(filter, options);
  return evaluation;
};

/**
 * Get evaluation by id
 * @param {ObjectId} id
 * @returns {Promise<Evaluation>}
 */
const getEvaluationById = async (id) => {
  return Evaluation.findById(id);
};

/**
 * Get evaluation by email
 * @param {string} email
 * @returns {Promise<evaluation>}
 */
const getEvaluationByEmail = async (email) => {
  return evaluation.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} evaluationId
 * @param {Object} updateBody
 * @returns {Promise<Evaluation>}
 */
const updateEvaluationById = async (evaluationId, updateBody) => {
  const evaluation = await getEvaluationById(EvaluationId);
  if (!evaluation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Evaluation not found');
  }
  if (updateBody.email && (await Evaluation.isEmailTaken(updateBody.email, evaluationId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(evaluation, updateBody);
  await evaluation.save();
  return evaluation;
};

/**
 * Delete evaluation by id
 * @param {ObjectId} evaluationId
 * @returns {Promise<Evaluation>}
 */
const deleteEvaluationById = async (evaluationId) => {
  const evaluatin = await getEvaluationById(evaluationId);
  if (!evaluation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Evaluation not found');
  }
  await evaluation.remove();
  return evaluation;
};

module.exports = {
  createEvaluation,
  queryEvaluation,
  getEvaluationById,
  updateEvaluationById,
  deleteEvaluationById,
};
