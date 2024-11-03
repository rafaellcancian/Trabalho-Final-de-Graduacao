import { Router } from 'express';
import { antiFloodPrevention } from '../middlewares/antiFlood.middleware';
import { pathValidation } from '../middlewares/validationData.middleware';
import { 
  cnpjParamsValidationRequest,
  cnpjController 
} from '../useCases/Cnpj';

const cnpjRouter = Router();

cnpjRouter.get(
  '/api/cnpj/v1/:cnpj',
  pathValidation(cnpjParamsValidationRequest),
  antiFloodPrevention(),
  async (request, response, next) => {
    try {
      await cnpjController.handle(request, response);
    } catch (e) {
      next(e);
    }
  }
);

export { cnpjRouter };
