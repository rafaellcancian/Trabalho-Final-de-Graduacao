import { Router } from 'express';
import { antiFloodPrevention } from '../middlewares/antiFlood.middleware';
import { pathValidation } from '../middlewares/validationData.middleware';
import { 
  dddController, 
  dddParamsValidationRequest
} from '../useCases/Ddd';

const dddRouter = Router();

dddRouter.get(
  '/api/ddd/v1/:prefixo',
  pathValidation(dddParamsValidationRequest),
  antiFloodPrevention(),
  async (request, response, next) => {
    try {
      await dddController.handle(request, response);
    } catch (e) {
      next(e);
    }
  }
);

export { dddRouter };
