import { Request, Response } from 'express';
import { BancosUseCase } from './BancosUseCase';

export class BancosController {
  constructor(private bancosUseCase: BancosUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { codigo } = request.query;

    const ip = request.socket.remoteAddress;

    const result = await this.bancosUseCase.execute({
      codigo: Number(codigo),
      ip
    });

    return response.status(200).send(result);
  }
}
