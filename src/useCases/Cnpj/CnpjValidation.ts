import Joi from 'joi';

export const cnpjParamsValidationRequest = {
  cnpj: Joi.string().regex(/^[0-9]+$/).min(14).max(14).required()
};
