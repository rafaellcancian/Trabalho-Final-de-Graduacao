import { ILogsRepository } from '../../repositories/ILogsRepository';
import { Log } from '../../entities/Log';
import { ThrowMessageRequest } from './../../util/ThrowMessageRequest';
import { Erro } from '../../entities/Erro';
import { IGeoIpRepository } from '../../repositories/IGeoIpRepository';
import {
  GeoIpRequestDTO,
  GeoIpResponseDTO
} from './GeoIpDTO';

export class GeoIpUseCase {
  constructor(
    private geoIpRepository: IGeoIpRepository,
    private logsRepository: ILogsRepository
  ) {}

  async execute(data: GeoIpRequestDTO): Promise<GeoIpResponseDTO> {
    let erros: any[] = [];

    // Provedor Invertexto
    const invertexto = await this.geoIpRepository.getGeoIpFromInvertexto(data.ip);
    if (invertexto instanceof Erro) {
      erros.push({
        provedor: 'Invertexto',
        erro: invertexto.mensagem
      });
    } else {
      await this.logsRepository.addLog(new Log({
        ipAddress: data.ipLog,
        action: 'GeoIp',
        provider: 'Invertexto',
        status: 200
      }));
      return invertexto;
    }
    
    await this.logsRepository.addLog(new Log({
      ipAddress: data.ipLog,
      action: 'GeoIp',
      provider: 'Todos',
      status: 500,
      errors: erros
    }));
    throw new ThrowMessageRequest().internalServerErrorObject('Todos os serviços de GeoIp retornaram erro.', erros);
  }
}
