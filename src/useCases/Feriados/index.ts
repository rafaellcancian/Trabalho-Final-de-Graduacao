import { LogRepository } from '../../repositories/implementations/LogRepository';
import { FeriadosUseCase } from './FeriadosUseCase';
import { FeriadosController } from './FeriadosController';
import { FeriadosRepository } from '../../repositories/implementations/FeriadosRepository';
import { 
  feriadosParamsValidationRequest,
  feriadosQueryValidationRequest
} from './FeriadosValidation';

const feriadosRepository = new FeriadosRepository();
const logsRepository = new LogRepository();

const feriadosUseCase = new FeriadosUseCase(
  feriadosRepository,
  logsRepository
);

const feriadosController = new FeriadosController(feriadosUseCase);

export {
  feriadosUseCase,
  feriadosController,
  feriadosParamsValidationRequest,
  feriadosQueryValidationRequest
}
