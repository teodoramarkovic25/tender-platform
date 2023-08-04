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
  const filter = pick(req.query, ['dateFrom','dateTo', 'weightageFrom', 'weightageTo']);
  const options = pick(req.query, ['sortBy', 'limit', 'page','populate']);
  const result = await tenderService.queryTenders(filter, options);
  res.send(result);
});

const getTender = catchAsync(async (req, res) => {
  const tender = await tenderService.getTenderById(req.params.tenderId);
  if (!tender) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tender not found');
  }
  await tender
    .populate('offers')
    .execPopulate();
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

const getActiveCount = catchAsync(async(req,res) => {
  const number = await tenderService.getActiveCount();
  if(number === 0){
    res.status(httpStatus.NO_CONTENT).send();
  }else{
    res.send({result : number});
  }
});

const getInactiveCount = catchAsync(async(req,res) => {
  const number = await tenderService.getInactiveCount();

  res.send({result : number});

});

module.exports = {
  createTender,
  getTender,
  getTenders,
  updateTender,
  deleteTender,
  getActiveCount,
  getInactiveCount,
};
