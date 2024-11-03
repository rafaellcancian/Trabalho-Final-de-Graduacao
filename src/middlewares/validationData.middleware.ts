import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

function pathValidation(schema: any) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const schemaAux = Joi.object(schema);
    const { error } = schemaAux.validate(request.params);

    if (!error) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      console.log('Erro na validação dos parâmetros do path: ' + message);
      response.status(422).send({ mensagem: 'Erro na validação dos parâmetros do path: ' + message });
    }
  };
};

function queryValidation(schema: any) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const schemaAux = Joi.object(schema);
    const { error } = schemaAux.validate(request.query);

    if (!error) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      console.log('Erro na validação dos parâmetros da query: ' + message);
      response.status(422).send({ mensagem: 'Erro na validação dos parâmetros da query: ' + message });
    }
  };
};

export {
  pathValidation,
  queryValidation
};
