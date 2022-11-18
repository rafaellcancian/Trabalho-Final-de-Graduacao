import { Request, Response } from 'express';
import { DddUseCase } from './DddUseCase';

export class DddController {
  constructor(private dddUseCase: DddUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { prefixo } = request.params;

    const ip = request.socket.remoteAddress;

    const result = await this.dddUseCase.execute({
      prefixo,
      ip
    });

    return response.status(200).send(result);
  }
}
