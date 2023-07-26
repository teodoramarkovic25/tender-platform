const Joi = require('joi');
const {objectId} = require('./custom.validation');

const createFile = {
  body: Joi.object().keys({
    documents: Joi.string(),
    createdBy: Joi.string()
  }),
};

const getFiles = {
  query: Joi.object().keys({
    documents: Joi.string(),
    createdBy: Joi.string(),

  }),
};


const getFile = {
  params: Joi.object().keys({
    fileId: Joi.string().custom(objectId),
  }),
};

const updateFile = {
  params: Joi.object().keys({
    fileId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      documents: Joi.string(),
      createdBy: Joi.string()
    })
    .min(1),
};

const deleteFile = {
  params: Joi.object().keys({
    fileId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFile,
  getFile,
  getFiles,
  deleteFile,
  updateFile
};
