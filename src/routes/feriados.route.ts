import { Router } from 'express';
import { antiFloodPrevention } from '../middlewares/antiFlood.middleware';
import { 
  pathValidation, 
  queryValidation 
} from '../middlewares/validationData.middleware';
import { 
  feriadosController, 
  feriadosParamsValidationRequest, 
  feriadosQueryValidationRequest
} from '../useCases/Feriados';

const feriadosRouter = Router();

feriadosRouter.get(
  '/api/feriados/v1/:ano',
  pathValidation(feriadosParamsValidationRequest),
  queryValidation(feriadosQueryValidationRequest),
  antiFloodPrevention(),
  async (request, response, next) => {
    try {
      await feriadosController.handle(request, response);
    } catch (e) {
      next(e);
    }
  }
);

export { feriadosRouter };
