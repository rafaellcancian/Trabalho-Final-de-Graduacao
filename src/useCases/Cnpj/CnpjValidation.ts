import * as joi from 'joi';

export const cnpjParamsValidationRequest = joi.object({
  cnpj: joi.string().regex(/^[0-9]+$/).min(14).max(14).required()
});
