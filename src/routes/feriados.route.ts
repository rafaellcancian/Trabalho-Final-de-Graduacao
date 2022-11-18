import { Router } from 'express';
import { middlewareAntiFloodPrevention } from '../middlewares/antiFloodMiddleware';
import { 
  middlewareParamsValidation, 
  middlewareQueryValidation 
} from '../middlewares/validationMiddleware';
import { 
  feriadosController, 
  feriadosParamsValidationRequest, 
  feriadosQueryValidationRequest
} from '../useCases/Feriados';

const feriadosRouter = Router();

feriadosRouter.get(
  '/api/feriados/v1/:ano',
  middlewareParamsValidation(feriadosParamsValidationRequest),
  middlewareQueryValidation(feriadosQueryValidationRequest),
  middlewareAntiFloodPrevention(),
  async (request, response, next) => {
    try {
      await feriadosController.handle(request, response);
    } catch (e) {
      next(e);
    }
  }
);

export { feriadosRouter };
