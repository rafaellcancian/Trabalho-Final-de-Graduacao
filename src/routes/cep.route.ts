import { Router } from 'express';
import { middlewareAntiFloodPrevention } from '../middlewares/antiFloodMiddleware';
import { 
  middlewareParamsValidation, 
  middlewareQueryValidation 
} from '../middlewares/validationMiddleware';
import { 
  cepController, 
  cepParamsValidationRequest, 
  cepQueryValidationRequest
} from '../useCases/Cep';

const cepRouter = Router();

cepRouter.get(
  '/api/cep/v1/:cep',
  middlewareParamsValidation(cepParamsValidationRequest),
  middlewareQueryValidation(cepQueryValidationRequest),
  middlewareAntiFloodPrevention(),
  async (request, response, next) => {
    try {
      await cepController.handle(request, response);
    } catch (e) {
      next(e);
    }
  }
);

export { cepRouter };
