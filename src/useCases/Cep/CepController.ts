import { Request, Response } from 'express';
import { CepUseCase } from './CepUseCase';

export class CepController {
  constructor(private cepUseCase: CepUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { cep } = request.params;
    const { provedor } = request.query;

    const ip = request.socket.remoteAddress;

    const result = await this.cepUseCase.execute({
      cep,
      provedor: provedor?.toString(),
      ip
    });

    return response.status(200).send(result);
  }
}
