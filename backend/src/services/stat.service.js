const httpStatus = require('http-status');
const {Tender} = require('../models');
const {Offer} = require('../models');
const offerService = require("../services/offer.service");
const tenderService = require("../services/tender.service");

const getStats = async ()=>{
  const activeTenders = await tenderService.getActiveCount();
  const inactiveTenders = await tenderService.getInactiveCount();
  const offers = await offerService.getCount();

  return {"activeTenders": activeTenders,
          "inactiveTenders": inactiveTenders,
          "offers": offers};
}

const getChartData = async ()=>{
  const collection = await tenderService.getChartData();
  return {"result":collection};
}

module.exports = {
  getStats,
  getChartData,
}
