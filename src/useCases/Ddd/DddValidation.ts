import * as joi from 'joi';

export const dddParamsValidationRequest = joi.object({
  prefixo: joi.string().regex(/^[0-9]+$/).min(2).max(2).required()
});
