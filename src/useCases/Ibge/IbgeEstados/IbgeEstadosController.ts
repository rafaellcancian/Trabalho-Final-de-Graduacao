import { Request, Response } from 'express';
import { IbgeEstadosUseCase } from './IbgeEstadosUseCase';

export class IbgeEstadosController {
  constructor(private ibgeEstadosUseCase: IbgeEstadosUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { uf } = request.query;

    const ip = request.socket.remoteAddress;

    const result = await this.ibgeEstadosUseCase.execute({
      uf: uf?.toString(),
      ip
    });

    return response.status(200).send(result);
  }
}
