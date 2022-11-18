import * as joi from 'joi';

export const cepParamsValidationRequest = joi.object({
  cep: joi.string().regex(/^[0-9]+$/).min(8).max(8).required()
});

export const cepQueryValidationRequest = joi.object({
  provedor: joi.string().valid('viacep', 'widenet', 'invertexto')
});
