import { Request, Response } from 'express';
import { GeoIpUseCase } from './GeoIpUseCase';

export class GeoIpController {
  constructor(private geoIpUseCase: GeoIpUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { ip } = request.params;

    const ipLog = request.socket.remoteAddress;

    const result = await this.geoIpUseCase.execute({
      ip,
      ipLog
    });

    return response.status(200).send(result);
  }
}
