import { DddUseCase } from './DddUseCase';
import { DddController } from './DddController';
import { dddParamsValidationRequest } from './DddValidation';
import { DddRepository } from '../../repositories/implementations/DddRepository';
import { LogRepository } from '../../repositories/implementations/LogRepository';

const dddRepository = new DddRepository();
const logsRepository = new LogRepository();

const dddUseCase = new DddUseCase(
  dddRepository,
  logsRepository
);

const dddController = new DddController(dddUseCase);

export {
  dddUseCase,
  dddController,
  dddParamsValidationRequest
}
