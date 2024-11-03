import limiter from 'express-light-limiter';
import { ThrowMessageRequest } from '../util/ThrowMessageRequest';

const limiterConfig = {
  quantum: 10 * 1000, // Um quantum tem 10 segundos
  maxRequestsPerQuantum: 5, // São permitidas 5 requisições por quantum
  lookup: 'connection.remoteAddress', // Limitado pelo endereço IP do usuário
  error: new ThrowMessageRequest().tooManyRequests() // Mensagem de erro personalizada
};

const antiFloodPrevention = () => {
  return limiter(limiterConfig);
};

export { antiFloodPrevention };
