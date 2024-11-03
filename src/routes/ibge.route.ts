import { Router } from 'express';
import { antiFloodPrevention } from '../middlewares/antiFlood.middleware';
import { 
  pathValidation, 
  queryValidation 
} from '../middlewares/validationData.middleware';
import { 
  ibgeEstadosQueryValidationRequest, 
  ibgeEstadosController 
} from '../useCases/Ibge/IbgeEstados';
import { 
  ibgeMunicipiosParamsValidationRequest, 
  ibgeMunicipiosController 
} from '../useCases/Ibge/IbgeMunicipios';

const ibgeRouter = Router();

// Ibge - Estados
ibgeRouter.get(
  '/api/ibge/estados/v1',
  queryValidation(ibgeEstadosQueryValidationRequest),
  antiFloodPrevention(),
  async (request, response, next) => {
    try {
      await ibgeEstadosController.handle(request, response);
    } catch (e) {
      next(e);
    }
  }
);

// Ibge - Municípios
ibgeRouter.get(
  '/api/ibge/municipios/v1/:uf',
  pathValidation(ibgeMunicipiosParamsValidationRequest),
  antiFloodPrevention(),
  async (request, response, next) => {
    try {
      await ibgeMunicipiosController.handle(request, response);
    } catch (e) {
      next(e);
    }
  }
);

export { ibgeRouter };
