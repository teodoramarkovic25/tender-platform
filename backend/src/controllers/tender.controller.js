const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { tenderService } = require('../services');

const createTender = catchAsync(async (req, res) => {
  const tender = await tenderService.createTender(req.body);
  res.status(httpStatus.CREATED).send(tender);
});

const getTenders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await tenderService.queryUsers(filter, options);
  res.send(result);
});

const getTender = catchAsync(async (req, res) => {
  const tender = await tenderService.getTenderById(req.params.tenderId);
  if (!tender) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tender not found');
  }
  res.send(tender);
});

const updateTender = catchAsync(async (req, res) => {
  const tender = await tenderService.updateTenderById(req.params.tenderId, req.body);
  res.send(tender);
});

const deleteTender = catchAsync(async (req, res) => {
  await tenderService.deleteTenderById(req.params.tenderId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTender,
  getTender,
  getTenders,
  updateTender,
  deleteTender,
};
