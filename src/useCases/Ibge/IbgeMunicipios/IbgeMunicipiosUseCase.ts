import { ILogsRepository } from '../../../repositories/ILogsRepository';
import { Log } from '../../../entities/Log';
import { ThrowMessageRequest } from '../../../util/ThrowMessageRequest';
import { Erro } from '../../../entities/Erro';
import { IIbgeRepository } from '../../../repositories/IIbgeRepository';
import {
  IbgeMunicipiosRequestDTO,
  IbgeMunicipiosResponseDTO
} from './IbgeMunicipiosDTO';

export class IbgeMunicipiosUseCase {
  constructor(
    private ibgeMunicipiosRepository: IIbgeRepository,
    private logsRepository: ILogsRepository
  ) {}

  async execute(data: IbgeMunicipiosRequestDTO): Promise<IbgeMunicipiosResponseDTO> {
    let erros: any[] = [];

    // Provedor Ibge
    const ibgeMunicipios = await this.ibgeMunicipiosRepository.getMunicipiosFromIbge(data.uf);
    if (ibgeMunicipios instanceof Erro) {
      erros.push({
        provedor: 'Ibge',
        erro: ibgeMunicipios.mensagem
      });
    } else {
      await this.logsRepository.addLog(new Log({
        ipAddress: data.ip,
        action: 'IbgeMunicipios',
        provider: 'Ibge',
        status: 200
      }));
      return {
        provedor: 'Ibge',
        municipios: ibgeMunicipios
      };
    }
    
    await this.logsRepository.addLog(new Log({
      ipAddress: data.ip,
      action: 'IbgeMunicipios',
      provider: 'Todos',
      status: 500,
      errors: erros
    }));
    throw new ThrowMessageRequest().internalServerErrorObject('Todos os serviços do Ibge retornaram erro.', erros);
  }
}
