import { IbgeMunicipiosUseCase } from './IbgeMunicipiosUseCase';
import { IbgeMunicipiosController } from './IbgeMunicipiosController';
import { ibgeMunicipiosParamsValidationRequest } from './IbgeMunicipiosValidation';
import { IbgeRepository } from '../../../repositories/implementations/IbgeRepository';
import { LogRepository } from '../../../repositories/implementations/LogRepository';

const ibgeMunicipiosRepository = new IbgeRepository();
const logsRepository = new LogRepository();

const ibgeMunicipiosUseCase = new IbgeMunicipiosUseCase(
  ibgeMunicipiosRepository,
  logsRepository
);

const ibgeMunicipiosController = new IbgeMunicipiosController(ibgeMunicipiosUseCase);

export {
  ibgeMunicipiosUseCase,
  ibgeMunicipiosController,
  ibgeMunicipiosParamsValidationRequest
}
