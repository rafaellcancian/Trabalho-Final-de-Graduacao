import { CnpjRepository } from './../../repositories/implementations/CnpjRepository';
import { CnpjUseCase } from './CnpjUseCase';
import { CnpjController } from './CnpjController';
import { cnpjParamsValidationRequest } from './CnpjValidation';
import { LogRepository } from '../../repositories/implementations/LogRepository';

const cnpjRepository = new CnpjRepository();
const logsRepository = new LogRepository();

const cnpjUseCase = new CnpjUseCase(
  cnpjRepository,
  logsRepository
);

const cnpjController = new CnpjController(cnpjUseCase);

export {
  cnpjUseCase,
  cnpjController,
  cnpjParamsValidationRequest
}
