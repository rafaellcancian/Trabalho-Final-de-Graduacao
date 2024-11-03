import { Router } from 'express';
import { antiFloodPrevention } from '../middlewares/antiFlood.middleware';
import { queryValidation } from '../middlewares/validationData.middleware';
import { 
  bancosController, 
  bancosQueryValidationRequest
} from '../useCases/Bancos';

const bancosRouter = Router();

bancosRouter.get(
  '/api/bancos/v1',
  queryValidation(bancosQueryValidationRequest),
  antiFloodPrevention(),
  async (request, response, next) => {
    try {
      await bancosController.handle(request, response);
    } catch (e) {
      next(e);
    }
  }
);

export { bancosRouter };
