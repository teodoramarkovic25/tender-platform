const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const statService = require("../services/stat.service");

const getStats = catchAsync(async(req,res) => {
  const stats = await statService.getStats();

  res.send(stats);

});
module.exports = {
  getStats
}
