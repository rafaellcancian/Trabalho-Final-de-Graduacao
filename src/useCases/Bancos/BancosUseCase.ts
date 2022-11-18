import { Log } from '../../entities/Log';
import { ILogsRepository } from '../../repositories/ILogsRepository';
import { ThrowMessageRequest } from './../../util/ThrowMessageRequest';
import { Erro } from '../../entities/Erro';
import { IBancosRepository } from '../../repositories/IBancosRepository';
import {
  BancosRequestDTO,
  BancosResponseDTO
} from './BancosDTO';

export class BancosUseCase {
  constructor(
    private bancosRepository: IBancosRepository,
    private logsRepository: ILogsRepository
  ) {}

  async execute(data: BancosRequestDTO): Promise<BancosResponseDTO> {
    let erros: any[] = [];

    // Provedor Banco Central
    const bancoCentral = await this.bancosRepository.getBancosFromBancoCentral(data.codigo);
    if (bancoCentral instanceof Erro) {
      erros.push({
        provedor: 'Banco Central',
        erro: bancoCentral.mensagem
      });
    } else {
      await this.logsRepository.addLog(new Log({
        ipAddress: data.ip,
        action: 'Bancos',
        provider: 'Banco Central',
        status: 200
      }));
      return {
        provedor: 'Banco Central',
        bancos: bancoCentral
      };
    }
    
    await this.logsRepository.addLog(new Log({
      ipAddress: data.ip,
      action: 'Bancos',
      provider: 'Todos',
      status: 500,
      errors: erros
    }));
    throw new ThrowMessageRequest().internalServerErrorObject('Todos os serviços de Bancos retornaram erro.', erros);
  }
}
