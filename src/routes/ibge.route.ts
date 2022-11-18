import { Router } from 'express';
import { middlewareAntiFloodPrevention } from '../middlewares/antiFloodMiddleware';
import { 
  middlewareParamsValidation, 
  middlewareQueryValidation 
} from '../middlewares/validationMiddleware';
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
  middlewareQueryValidation(ibgeEstadosQueryValidationRequest),
  middlewareAntiFloodPrevention(),
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
  middlewareParamsValidation(ibgeMunicipiosParamsValidationRequest),
  middlewareAntiFloodPrevention(),
  async (request, response, next) => {
    try {
      await ibgeMunicipiosController.handle(request, response);
    } catch (e) {
      next(e);
    }
  }
);

export { ibgeRouter };
