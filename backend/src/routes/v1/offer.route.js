const express=require('express');
const auth = require('../../middlewares/auth');
const validate=require('../../middlewares/validate');
const offerValidation = require("../../validations/offer.validation");
const offerController = require("../../controllers/offer.controller");

const router=express.Router;

router
  .route('/')
  .post(auth('manageOffers'),validate(offerValidation.createOffer),offerController.createOffer)



module.exports=router;
