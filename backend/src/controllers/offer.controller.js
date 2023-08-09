const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {offerService} = require('../services');
const {uploadFile}=require('./file.controller');
const {fileService}=require('../services');

const createOffer = catchAsync(async (req, res) => {

  try{
    console.log(req.files);
    const saveFile=await uploadFile(req,res);

    const files=await fileService.queryFiles({},{});

    const lastUploadedFile=files.results[files.totalResults-1];
    const offerData={
      ...req.body,
      documents:lastUploadedFile.id
    }

    const offer = await offerService.createOffer(offerData);


    res.status(httpStatus.CREATED).send(offer);
  }catch(error){
console.error(error);
  }
});

const getOffers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['tender', 'company']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await offerService.queryOffers(filter, options);
  res.send(result);
});

const getOffer = catchAsync(async (req, res) => {
  const offer = await offerService.getOfferById(req.params.offerId);
  if (!offer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Offer not found');
  }
  res.send(offer);
});

const updateOffer = catchAsync(async (req, res) => {
  const offer = await offerService.updateOfferById(req.params.offerId, req.body);
  res.send(offer);
});

const deleteOffer = catchAsync(async (req, res) => {
  await offerService.deleteOfferById(req.params.offerId);
  res.status(httpStatus.NO_CONTENT).send();
});



module.exports = {
  createOffer,
  getOffers,
  getOffer,
  updateOffer,
  deleteOffer,

};
