import { Request, Response } from 'express';
import { IbgeMunicipiosUseCase } from './IbgeMunicipiosUseCase';

export class IbgeMunicipiosController {
  constructor(private ibgeMunicipiosUseCase: IbgeMunicipiosUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { uf } = request.params;

    const ip = request.socket.remoteAddress;

    const result = await this.ibgeMunicipiosUseCase.execute({
      uf,
      ip
    });

    return response.status(200).send(result);
  }
}
