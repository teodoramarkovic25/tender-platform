
const express = require('express')
const validate = require('../../middlewares/validate');
const upload = require('./file/service');

const router = express.Router();

router.post('/upload', upload.single('documents'), (req, res) => {
  console.log(req.file);
  return res.sendStatus(200);
});

module.exports = router;
