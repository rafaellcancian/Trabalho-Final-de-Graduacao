import { GeoIpUseCase } from './GeoIpUseCase';
import { GeoIpController } from './GeoIpController';
import { GeoIpRepository } from '../../repositories/implementations/GeoIpRepository';
import { geoIpParamsValidationRequest } from './GeoIpValidation';
import { LogRepository } from '../../repositories/implementations/LogRepository';

const geoIpRepository = new GeoIpRepository();
const logsRepository = new LogRepository();

const geoIpUseCase = new GeoIpUseCase(
  geoIpRepository,
  logsRepository
);

const geoIpController = new GeoIpController(geoIpUseCase);

export {
  geoIpUseCase,
  geoIpController,
  geoIpParamsValidationRequest
}
