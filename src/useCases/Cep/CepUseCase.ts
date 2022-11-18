import { Erro } from '../../entities/Erro';
import { ILogsRepository } from '../../repositories/ILogsRepository';
import { Log } from '../../entities/Log';
import { ThrowMessageRequest } from '../../util/ThrowMessageRequest';
import { ICepRepository } from '../../repositories/ICepRepository';
import {
  CepRequestDTO,
  CepResponseDTO
} from './CepDTO';

export class CepUseCase {
  constructor(
    private cepRepository: ICepRepository,
    private logsRepository: ILogsRepository
  ) {}

  async execute(data: CepRequestDTO): Promise<CepResponseDTO> {
    let erros: any[] = [];

    switch (data.provedor) {
      case 'viacep': {
        const viacep = await this.cepRepository.getCepFromViaCep(data.cep);
        if (viacep instanceof Erro) {
          erros.push(viacep.mensagem);
          await this.logsRepository.addLog(new Log({
            ipAddress: data.ip,
            action: 'Cep',
            provider: 'ViaCEP',
            status: 500,
            errors: erros
          }));
          throw new ThrowMessageRequest().internalServerErrorObject('O serviço ViaCEP retornou erro.', viacep.mensagem);
        } else {
          await this.logsRepository.addLog(new Log({
            ipAddress: data.ip,
            action: 'Cep',
            provider: 'ViaCEP',
            status: 200
          }));
          return viacep;
        }
      }
      case 'widenet': {
        const widenet = await this.cepRepository.getCepFromWidenet(data.cep);
        if (widenet instanceof Erro) {
          erros.push(widenet.mensagem);
          await this.logsRepository.addLog(new Log({
            ipAddress: data.ip,
            action: 'Cep',
            provider: 'Widenet',
            status: 500,
            errors: erros
          }));
          throw new ThrowMessageRequest().internalServerErrorObject('O serviço Widenet retornou erro.', widenet.mensagem);
        } else {
          await this.logsRepository.addLog(new Log({
            ipAddress: data.ip,
            action: 'Cep',
            provider: 'Widenet',
            status: 200
          }));
          return widenet;
        }
      }
      case 'invertexto': {
        const invertexto = await this.cepRepository.getCepFromInverTexto(data.cep);
        if (invertexto instanceof Erro) {
          erros.push(invertexto.mensagem);
          await this.logsRepository.addLog(new Log({
            ipAddress: data.ip,
            action: 'Cep',
            provider: 'Invertexto',
            status: 500,
            errors: erros
          }));
          throw new ThrowMessageRequest().internalServerErrorObject('O serviço Invertexto retornou erro.', invertexto.mensagem);
        } else {
          await this.logsRepository.addLog(new Log({
            ipAddress: data.ip,
            action: 'Cep',
            provider: 'Invertexto',
            status: 200
          }));
          return invertexto;
        }
      }
    }

    // Provedor ViaCEP
    const viacep = await this.cepRepository.getCepFromViaCep(data.cep);
    if (viacep instanceof Erro) {
      erros.push({
        provedor: 'ViaCEP',
        erro: viacep.mensagem
      });
    } else {
      await this.logsRepository.addLog(new Log({
        ipAddress: data.ip,
        action: 'Cep',
        provider: 'ViaCEP',
        status: 200
      }));
      return viacep;
    }

    // Provedor Widenet
    const wideNet = await this.cepRepository.getCepFromWidenet(data.cep);
    if (wideNet instanceof Erro) {
      erros.push({
        provedor: 'Widenet',
        erro: wideNet.mensagem
      });
    } else {
      await this.logsRepository.addLog(new Log({
        ipAddress: data.ip,
        action: 'Cep',
        provider: 'Widenet',
        status: 200
      }));
      return wideNet;
    }

    // Provedor Invertexto
    const invertexto = await this.cepRepository.getCepFromInverTexto(data.cep);
    if (invertexto instanceof Erro) {
      erros.push({
        provedor: 'Invertexto',
        erro: invertexto.mensagem
      });
    } else {
      await this.logsRepository.addLog(new Log({
        ipAddress: data.ip,
        action: 'Cep',
        provider: 'Invertexto',
        status: 200
      }));
      return invertexto;
    }
    
    await this.logsRepository.addLog(new Log({
      ipAddress: data.ip,
      action: 'Cep',
      provider: 'Todos',
      status: 500,
      errors: erros
    }));
    throw new ThrowMessageRequest().internalServerErrorObject('Todos os serviços de CEP retornaram erro.', erros);
  }
}
