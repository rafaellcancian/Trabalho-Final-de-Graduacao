import * as joi from 'joi';

export const feriadosParamsValidationRequest = joi.object({
  ano: joi.string().regex(/^[0-9]+$/).required()
});

export const feriadosQueryValidationRequest = joi.object({
  uf: joi.string().valid(
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
  provedor: joi.string().valid('invertexto', 'brasilapi')
});
