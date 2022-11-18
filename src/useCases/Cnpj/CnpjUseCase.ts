import { Log } from '../../entities/Log';
import { Erro } from '../../entities/Erro';
import { ILogsRepository } from '../../repositories/ILogsRepository';
import { ThrowMessageRequest } from './../../util/ThrowMessageRequest';
import { ICnpjRepository } from './../../repositories/ICnpjRepository';
import {
  CnpjRequestDTO,
  CnpjResponseDTO
} from './CnpjDTO';

export class CnpjUseCase {
  constructor(
    private cnpjRepository: ICnpjRepository,
    private logsRepository: ILogsRepository
  ) {}

  async execute(data: CnpjRequestDTO): Promise<CnpjResponseDTO> {
    let erros: any[] = [];
    
    // Provedor Minha Receita
    const minhaReceita = await this.cnpjRepository.getCnpjFromMinhaReceita(data.cnpj);
    if (minhaReceita instanceof Erro) {
      erros.push({
        provedor: 'Minha Receita',
        erro: minhaReceita.mensagem
      });
    } else {
      await this.logsRepository.addLog(new Log({
        ipAddress: data.ip,
        action: 'Cnpj',
        provider: 'Minha Receita',
        status: 200
      }));
      return minhaReceita;
    }

    await this.logsRepository.addLog(new Log({
      ipAddress: data.ip,
      action: 'Cnpj',
      provider: 'Todos',
      status: 500,
      errors: erros
    }));
    throw new ThrowMessageRequest().internalServerErrorObject('Todos os serviços de CNPJ retornaram erro.', erros);
  }
}
