import { ILogsRepository } from '../../repositories/ILogsRepository';
import { Log } from '../../entities/Log';
import { ThrowMessageRequest } from './../../util/ThrowMessageRequest';
import { Erro } from '../../entities/Erro';
import { IDddRepository } from '../../repositories/IDddRepository';
import {
  DddRequestDTO,
  DddResponseDTO
} from './DddDTO';

export class DddUseCase {
  constructor(
    private dddRepository: IDddRepository,
    private logsRepository: ILogsRepository
  ) {}

  async execute(data: DddRequestDTO): Promise<DddResponseDTO> {
    let erros: any[] = [];

    // Provedor Anatel
    const anatel = await this.dddRepository.getDddFromAnatel(data.prefixo);
    if (anatel instanceof Erro) {
      erros.push({
        provedor: 'Anatel',
        erro: anatel.mensagem
      });
    } else {
      await this.logsRepository.addLog(new Log({
        ipAddress: data.ip,
        action: 'Ddd',
        provider: 'Anatel',
        status: 200
      }));
      return anatel;
    }
    
    await this.logsRepository.addLog(new Log({
      ipAddress: data.ip,
      action: 'Ddd',
      provider: 'Todos',
      status: 500,
      errors: erros
    }));
    throw new ThrowMessageRequest().internalServerErrorObject('Todos os serviços de DDD retornaram erro.', erros);
  }
}
