import { LogRepository } from '../../repositories/implementations/LogRepository';
import { CepRepository } from '../../repositories/implementations/CepRepository';
import { CepUseCase } from './CepUseCase';
import { CepController } from './CepController';
import { 
  cepParamsValidationRequest, 
  cepQueryValidationRequest 
} from './CepValidation';

const cepRepository = new CepRepository();
const logsRepository = new LogRepository();

const cepUseCase = new CepUseCase(
  cepRepository,
  logsRepository
);

const cepController = new CepController(cepUseCase);

export {
  cepUseCase,
  cepController,
  cepParamsValidationRequest,
  cepQueryValidationRequest
}
