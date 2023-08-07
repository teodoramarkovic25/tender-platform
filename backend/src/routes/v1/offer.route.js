const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const offerValidation = require('../../validations/offer.validation');
const offerController = require('../../controllers/offer.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageOffers'), validate(offerValidation.createOffer), offerController.createOffer)
  .get(auth('getOffers'), validate(offerValidation.getOffers), offerController.getOffers);



router
  .route('/:offerId')
  .get(auth('getOffers'), validate(offerValidation.getOffer), offerController.getOffer)
  .patch(auth('manageOffers'), validate(offerValidation.updateOffer), offerController.updateOffer)
  .delete(auth('manageOffers'), validate(offerValidation.deleteOffer), offerController.deleteOffer);



module.exports = router;


