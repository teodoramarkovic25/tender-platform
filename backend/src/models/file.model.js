const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({

  originalName: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
