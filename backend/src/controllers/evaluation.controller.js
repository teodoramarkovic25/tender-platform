

const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { evaluationService } = require('../services');

const createEvaluation = catchAsync(async (req, res) => {
  const evaluation = await evaluationService.createEvaluation(req.body);
  res.status(httpStatus.CREATED).send(evaluation);
});

const getEvaluations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await evaluationService.queryevaluation(filter, options);
  res.send(result);
});

const getEvaluation = catchAsync(async (req, res) => {
  const evaluation = await evaluationService.getevaluationById(req.params.userId);
  if (!evaluation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Evaluation not found');
  }
  res.send(evaluation);
});

const updateEvaluation = catchAsync(async (req, res) => {
  const evaluation = await evaluationService.updateById(req.params.evaluationId, req.body);
  res.send(evaluation);
});

const deleteEvaluation = catchAsync(async (req, res) => {
  await EvaluationService.deleteEvaluationById(req.params.evaluationId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEvaluation,
  getEvaluations,
  getEvaluation,
  updateEvaluation,
  deleteEvaluation,
};
