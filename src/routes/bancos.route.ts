import { Router } from 'express';
import { middlewareAntiFloodPrevention } from '../middlewares/antiFloodMiddleware';
import { middlewareQueryValidation } from '../middlewares/validationMiddleware';
import { 
  bancosController, 
  bancosQueryValidationRequest
} from '../useCases/Bancos';

const bancosRouter = Router();

bancosRouter.get(
  '/api/bancos/v1',
  middlewareQueryValidation(bancosQueryValidationRequest),
  middlewareAntiFloodPrevention(),
  async (request, response, next) => {
    try {
      await bancosController.handle(request, response);
    } catch (e) {
      next(e);
    }
  }
);

export { bancosRouter };
