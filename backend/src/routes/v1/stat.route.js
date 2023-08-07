const express = require("express");
const validate = require('../../middlewares/validate');
const statsController = require("../../controllers/stat.controller");
const auth = require('../../middlewares/auth');


const router = express.Router();

router
  .route("/")
  .get(auth("getStats"), statsController.getStats);


module.exports = router;
