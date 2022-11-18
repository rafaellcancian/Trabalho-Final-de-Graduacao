import { Router } from 'express';
import { middlewareAntiFloodPrevention } from '../middlewares/antiFloodMiddleware';
import { middlewareParamsValidation } from '../middlewares/validationMiddleware';
import { 
  geoIpController, 
  geoIpParamsValidationRequest
} from '../useCases/GeoIp';

const geoIpRouter = Router();

geoIpRouter.get(
  '/api/geoIp/v1/:ip',
  middlewareParamsValidation(geoIpParamsValidationRequest),
  middlewareAntiFloodPrevention(),
  async (request, response, next) => {
    try {
      await geoIpController.handle(request, response);
    } catch (e) {
      next(e);
    }
  }
);

export { geoIpRouter };
