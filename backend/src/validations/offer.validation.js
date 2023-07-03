const Joi=require('joi');

const createOffer={
  body:Joi.object().keys({
    yourOffer:Joi.number().required().positive().min(1),
   // chooseFile:Joi.any().required()
  })
};


module.exports={
  createOffer,

};
