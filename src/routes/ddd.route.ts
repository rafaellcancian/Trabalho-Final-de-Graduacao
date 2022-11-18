import { Router } from 'express';
import { middlewareAntiFloodPrevention } from '../middlewares/antiFloodMiddleware';
import { middlewareParamsValidation } from '../middlewares/validationMiddleware';
import { 
  dddController, 
  dddParamsValidationRequest
} from '../useCases/Ddd';

const dddRouter = Router();

dddRouter.get(
  '/api/ddd/v1/:prefixo',
  middlewareParamsValidation(dddParamsValidationRequest),
  middlewareAntiFloodPrevention(),
  async (request, response, next) => {
    try {
      await dddController.handle(request, response);
    } catch (e) {
      next(e);
    }
  }
);

export { dddRouter };
