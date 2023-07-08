/*const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalName}`);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('documents'), (req, res) => {
  console.log(req.file);



  return res.sendStatus(200);
});

module.exports = router;

*/
const express = require('express')
const validate = require('../../middlewares/validate');
const upload = require('./file/service');

const router = express.Router();

router.post('/upload', upload.single('documents'), (req, res) => {
  console.log(req.file);
  return res.sendStatus(200);
});

module.exports = router;
