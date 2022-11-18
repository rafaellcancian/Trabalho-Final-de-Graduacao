import * as joi from 'joi';

export const bancosQueryValidationRequest = joi.object({
  codigo: joi.number().integer().min(1).max(999)
});
