import Joi from 'joi';

export const dddParamsValidationRequest = {
  prefixo: Joi.string().regex(/^[0-9]+$/).min(2).max(2).required()
};
