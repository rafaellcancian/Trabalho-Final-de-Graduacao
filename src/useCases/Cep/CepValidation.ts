import Joi from 'joi';

export const cepParamsValidationRequest = {
  cep: Joi.string().regex(/^[0-9]+$/).min(8).max(8).required()
};

export const cepQueryValidationRequest = {
  provedor: Joi.string().valid('viacep', 'widenet', 'invertexto')
};
