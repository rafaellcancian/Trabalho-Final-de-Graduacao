import { Router } from 'express';
import { middlewareAntiFloodPrevention } from '../middlewares/antiFloodMiddleware';
import { middlewareParamsValidation } from '../middlewares/validationMiddleware';
import { 
  cnpjParamsValidationRequest,
  cnpjController 
} from '../useCases/Cnpj';

const cnpjRouter = Router();

cnpjRouter.get(
  '/api/cnpj/v1/:cnpj',
  middlewareParamsValidation(cnpjParamsValidationRequest),
  middlewareAntiFloodPrevention(),
  async (request, response, next) => {
    try {
      await cnpjController.handle(request, response);
    } catch (e) {
      next(e);
    }
  }
);

export { cnpjRouter };
