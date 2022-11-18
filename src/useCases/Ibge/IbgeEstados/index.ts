import { IbgeEstadosUseCase } from './IbgeEstadosUseCase';
import { IbgeEstadosController } from './IbgeEstadosController';
import { ibgeEstadosQueryValidationRequest } from './IbgeEstadosValidation';
import { IbgeRepository } from '../../../repositories/implementations/IbgeRepository';
import { LogRepository } from '../../../repositories/implementations/LogRepository';

const ibgeEstadosRepository = new IbgeRepository();
const logsRepository = new LogRepository();

const ibgeEstadosUseCase = new IbgeEstadosUseCase(
  ibgeEstadosRepository,
  logsRepository
);

const ibgeEstadosController = new IbgeEstadosController(ibgeEstadosUseCase);

export {
  ibgeEstadosUseCase,
  ibgeEstadosController,
  ibgeEstadosQueryValidationRequest
}
