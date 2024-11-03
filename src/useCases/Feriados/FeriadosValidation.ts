import Joi from 'joi';

export const feriadosParamsValidationRequest = {
  ano: Joi.string().regex(/^[0-9]+$/).required()
};

export const feriadosQueryValidationRequest = {
  uf: Joi.string().valid(
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO'
  ),
  provedor: Joi.string().valid('invertexto', 'brasilapi')
};
