const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const fileSchema = new mongoose.Schema({

  originalName: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
