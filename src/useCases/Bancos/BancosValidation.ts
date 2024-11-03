import Joi from 'joi';

export const bancosQueryValidationRequest = {
  codigo: Joi.number().integer().min(1).max(999)
};
