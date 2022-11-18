import * as joi from 'joi';

export const geoIpParamsValidationRequest = joi.object({
  ip: joi.string().ip().required()
});
