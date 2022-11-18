import { BancosUseCase } from './BancosUseCase';
import { BancosController } from './BancosController';
import { BancosRepository } from '../../repositories/implementations/BancosRepository';
import { bancosQueryValidationRequest } from './BancosValidation';
import { LogRepository } from '../../repositories/implementations/LogRepository';

const bancosRepository = new BancosRepository();
const logsRepository = new LogRepository();

const bancosUseCase = new BancosUseCase(
  bancosRepository,
  logsRepository
);

const bancosController = new BancosController(bancosUseCase);

export {
  bancosUseCase,
  bancosController,
  bancosQueryValidationRequest
}
