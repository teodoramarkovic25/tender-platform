const {fileService, userService} = require('../services');
const {createFile} = require('../services/file.service');
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const pick = require("../utils/pick");

const uploadFile = async (req, res) => {
  try {
    const files = req.files;
    const uploadedFiles = [];

    for (const file of files) {
      const {originalname, filename, mimetype, size} = file;

      const savedFile = await createFile(req.body, file);
      uploadedFiles.push(savedFile);
    }
    return res.status(200).json(uploadedFiles);
  } catch (error) {
    console.error('Error occurred while saving files:', error);
    return res.status(500).json({error: 'Error occurred while saving files'});
  }
};

const getFile = catchAsync(async (req, res) => {
  const file = await fileService.getFileById(req.params.fileId);
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  res.send(file);
});

const getFiles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['createdBy', 'fileType', 'getFiles', 'fileSize']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await fileService.queryFiles(filter, options);
  res.send(result);
})

const updateFile = catchAsync(async (req, res) => {
  const file = await fileService.updateFileById(req.params.fileId, req.body);
  res.send(file);
});

const deleteFile = catchAsync(async (req, res) => {
  await fileService.deleteFileById(req.params.fileId);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  uploadFile,
  getFile,
  getFiles,
  updateFile,
  deleteFile
};
