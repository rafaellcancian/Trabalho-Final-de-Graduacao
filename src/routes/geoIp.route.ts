import { Router } from 'express';
import { antiFloodPrevention } from '../middlewares/antiFlood.middleware';
import { pathValidation } from '../middlewares/validationData.middleware';
import { 
  geoIpController, 
  geoIpParamsValidationRequest
} from '../useCases/GeoIp';

const geoIpRouter = Router();

geoIpRouter.get(
  '/api/geoIp/v1/:ip',
  pathValidation(geoIpParamsValidationRequest),
  antiFloodPrevention(),
  async (request, response, next) => {
    try {
      await geoIpController.handle(request, response);
    } catch (e) {
      next(e);
    }
  }
);

export { geoIpRouter };
