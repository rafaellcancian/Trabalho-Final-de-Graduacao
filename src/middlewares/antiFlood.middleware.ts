import { rateLimit } from 'express-rate-limit';
import { ThrowMessageRequest } from '../util/ThrowMessageRequest';

const limiterConfig = {
  windowMs: 10 * 1000, // Um quantum tem 10 segundos
  limit: 5, // São permitidas 5 requisições por quantum
  standardHeaders: false, // Não envia os cabeçalhos RateLimit-*
  legacyHeaders: false, // Não envia os cabeçalhos X-RateLimit-*
  handler: (request, response, next) => next(new ThrowMessageRequest().tooManyRequests()) // Mensagem de erro personalizada
};

const antiFloodPrevention = () => {
  return rateLimit(limiterConfig);
};

export { antiFloodPrevention };
