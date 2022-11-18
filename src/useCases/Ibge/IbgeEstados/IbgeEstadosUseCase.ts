import { ILogsRepository } from '../../../repositories/ILogsRepository';
import { Log } from '../../../entities/Log';
import { ThrowMessageRequest } from './../../../util/ThrowMessageRequest';
import { Erro } from '../../../entities/Erro';
import { IIbgeRepository } from '../../../repositories/IIbgeRepository';
import {
  IbgeEstadosRequestDTO,
  IbgeEstadosResponseDTO
} from './IbgeEstadosDTO';

export class IbgeEstadosUseCase {
  constructor(
    private ibgeEstadosRepository: IIbgeRepository,
    private logsRepository: ILogsRepository
  ) {}

  async execute(data: IbgeEstadosRequestDTO): Promise<IbgeEstadosResponseDTO> {
    let erros: any[] = [];

    // Provedor Ibge
    const ibgeEstados = await this.ibgeEstadosRepository.getEstadosFromIbge(data.uf);
    if (ibgeEstados instanceof Erro) {
      erros.push({
        provedor: 'Ibge',
        erro: ibgeEstados.mensagem
      });
    } else {
      await this.logsRepository.addLog(new Log({
        ipAddress: data.ip,
        action: 'IbgeEstados',
        provider: 'Ibge',
        status: 200
      }));
      return {
        provedor: 'Ibge',
        estados: ibgeEstados
      };
    }
    
    await this.logsRepository.addLog(new Log({
      ipAddress: data.ip,
      action: 'IbgeEstados',
      provider: 'Todos',
      status: 500,
      errors: erros
    }));
    throw new ThrowMessageRequest().internalServerErrorObject('Todos os serviços do Ibge retornaram erro.', erros);
  }
}
