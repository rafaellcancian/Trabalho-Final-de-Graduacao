import { Router } from 'express';
import { antiFloodPrevention } from '../middlewares/antiFlood.middleware';
import { 
  pathValidation, 
  queryValidation 
} from '../middlewares/validationData.middleware';
import { 
  cepController, 
  cepParamsValidationRequest, 
  cepQueryValidationRequest
} from '../useCases/Cep';

const cepRouter = Router();

cepRouter.get(
  '/api/cep/v1/:cep',
  pathValidation(cepParamsValidationRequest),
  queryValidation(cepQueryValidationRequest),
  antiFloodPrevention(),
  async (request, response, next) => {
    try {
      await cepController.handle(request, response);
    } catch (e) {
      next(e);
    }
  }
);

export { cepRouter };
