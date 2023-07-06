const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const {writeFileSync} = require("fs");
const {join} = require("path");
const { v4: uuidv4 } = require('uuid');

const createFile = async (fileBody, file) => {
  const originalName = fileBody.originalName;
  const newName = uuidv4() + originalName;
  fileBody.name = newName;
  const dirPath = join(__dirname, '/uploads');
  try {
    writeFileSync(dirPath('/uploads') + newName, file);
  } catch (err) {
    console.error(err);
  }
  return File.create(fileBody);
};

const getFileById = async (id) => {
  try {
    const file = await File.findById(id);
    return file;
  } catch (error) {
    console.error('File do not find:', error);
    throw error;
  }
};

const deleteFileById = async (fileId) => {
  const file = await getFileById(fileId);
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  await file.remove();
  return file;
};


module.exports = {
  createFile,
  getFileById,
  deleteFileById
};
