import { Request, Response } from 'express';
import { FeriadosUseCase } from './FeriadosUseCase';

export class FeriadosController {
  constructor(private feriadosUseCase: FeriadosUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { ano } = request.params;
    const { uf, provedor } = request.query;

    const ip = request.socket.remoteAddress;

    const result = await this.feriadosUseCase.execute({
      ano,
      uf: uf?.toString(),
      provedor: provedor?.toString(),
      ip
    });

    return response.status(200).send(result);
  }
}
