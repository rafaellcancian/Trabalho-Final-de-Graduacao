const middlewareParamsValidation = (schema, property?) => {
  return (request, response, next) => {
    const { error, value } = schema.validate(request.params);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      console.log('Erro na validação dos parâmetros do path: ' + message);
      return response.status(422).send({ mensagem: 'Erro na validação dos parâmetros do path: ' + message });
    }
  };
};

const middlewareQueryValidation = (schema, property?) => {
  return (request, response, next) => {
    const { error, value } = schema.validate(request.query);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      console.log('Erro na validação dos parâmetros da query: ' + message);
      return response.status(422).send({ mensagem: 'Erro na validação dos parâmetros da query: ' + message });
    }
  };
};

export {
  middlewareParamsValidation,
  middlewareQueryValidation
};
