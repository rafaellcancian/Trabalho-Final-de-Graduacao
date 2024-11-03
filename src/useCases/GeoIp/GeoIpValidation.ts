import Joi from 'joi';

export const geoIpParamsValidationRequest = {
  ip: Joi.string().ip().required()
};
