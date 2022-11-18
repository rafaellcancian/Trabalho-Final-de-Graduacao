import { ILogsRepository } from '../../repositories/ILogsRepository';
import { Log } from '../../entities/Log';
import { ThrowMessageRequest } from './../../util/ThrowMessageRequest';
import { Erro } from '../../entities/Erro';
import { IFeriadosRepository } from '../../repositories/IFeriadosRepository';
import {
  FeriadosRequestDTO,
  FeriadosResponseDTO
} from './FeriadosDTO';

export class FeriadosUseCase {
  constructor(
    private feriadosRepository: IFeriadosRepository,
    private logsRepository: ILogsRepository
  ) {}

  async execute(data: FeriadosRequestDTO): Promise<FeriadosResponseDTO> {
    let erros: any[] = [];

    switch (data.provedor) {
      case 'invertexto': {
        const invertexto = await this.feriadosRepository.getFeriadosFromInvertexto(data.ano, data.uf);
        if (invertexto instanceof Erro) {
          erros.push(invertexto.mensagem);
          await this.logsRepository.addLog(new Log({
            ipAddress: data.ip,
            action: 'Feriados',
            provider: 'Invertexto',
            status: 500,
            errors: erros
          }));
          throw new ThrowMessageRequest().internalServerErrorObject('O serviço Invertexto retornou erro.', invertexto.mensagem);
        } else {
          await this.logsRepository.addLog(new Log({
            ipAddress: data.ip,
            action: 'Feriados',
            provider: 'Invertexto',
            status: 200
          }));
          return {
            provedor: 'Invertexto',
            feriados: invertexto
          };
        }
      }
      case 'brasilapi': {
        const brasilApi = await this.feriadosRepository.getFeriadosFromBrasilApi(data.ano);
        if (brasilApi instanceof Erro) {
          erros.push(brasilApi.mensagem);
          await this.logsRepository.addLog(new Log({
            ipAddress: data.ip,
            action: 'Feriados',
            provider: 'Brasil API',
            status: 500,
            errors: erros
          }));
          throw new ThrowMessageRequest().internalServerErrorObject('O serviço Brasil API retornou erro.', brasilApi.mensagem);
        } else {
          await this.logsRepository.addLog(new Log({
            ipAddress: data.ip,
            action: 'Feriados',
            provider: 'Brasil API',
            status: 200
          }));
          return {
            provedor: 'Brasil API',
            feriados: brasilApi
          };
        }
      }
    }

    // Provedor Invertexto
    const invertexto = await this.feriadosRepository.getFeriadosFromInvertexto(data.ano, data.uf);
    if (invertexto instanceof Erro) {
      erros.push({
        provedor: 'Invertexto',
        erro: invertexto.mensagem
      });
    } else {
      await this.logsRepository.addLog(new Log({
        ipAddress: data.ip,
        action: 'Feriados',
        provider: 'Invertexto',
        status: 200
      }));
      return {
        provedor: 'Invertexto',
        feriados: invertexto
      };
    }

    // Provedor Brasil API
    const brasilApi = await this.feriadosRepository.getFeriadosFromBrasilApi(data.ano);
    if (brasilApi instanceof Erro) {
      erros.push({
        provedor: 'Brasil API',
        erro: brasilApi.mensagem
      });
    } else {
      await this.logsRepository.addLog(new Log({
        ipAddress: data.ip,
        action: 'Feriados',
        provider: 'Brasil API',
        status: 200
      }));
      return {
        provedor: 'Brasil API',
        feriados: brasilApi
      };
    }
    
    await this.logsRepository.addLog(new Log({
      ipAddress: data.ip,
      action: 'Feriados',
      provider: 'Todos',
      status: 500,
      errors: erros
    }));
    throw new ThrowMessageRequest().internalServerErrorObject('Todos os serviços de Feriados Nacionais retornaram erro.', erros);
  }
}
