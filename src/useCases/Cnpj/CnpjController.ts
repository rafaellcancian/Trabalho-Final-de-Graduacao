import { Request, Response } from 'express';
import { CnpjUseCase } from './CnpjUseCase';

export class CnpjController {
  constructor(private cnpjUseCase: CnpjUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { cnpj } = request.params;

    const ip = request.socket.remoteAddress;

    const result = await this.cnpjUseCase.execute({
      cnpj,
      ip
    });

    return response.status(200).send(result);
  }
}
