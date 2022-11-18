import axios, { AxiosResponse } from 'axios';
import { Erro } from '../../entities/Erro';
import { Feriado } from '../../entities/Feriado';
import { invertextoApiToken } from '../../util/environment';
import { IFeriadosRepository } from '../IFeriadosRepository';

export class FeriadosRepository implements IFeriadosRepository {
  async getFeriadosFromInvertexto(ano: string, uf?: string): Promise<Feriado[] | Erro> {
    let erro: Erro = new Erro({
      estado: false
    });

    const token = invertextoApiToken;

    const result: AxiosResponse | void = await axios
    .get(`https://api.invertexto.com/v1/holidays/${ano}?token=${token}&state=${uf}`)
    .catch(function (error) {
      console.log('Erro do Axios: ' + error.message);
      erro.estado = true;
      erro.mensagem = error.response ? error.response.data : error.message;
    });

    // Tratamento de erro genérico
    if (!result || erro.estado == true) return erro;

    const feriadosResponse = result.data.map((item) => {
      return new Feriado({
        data: item.date,
        nome: item.name,
        tipo: item.type,
        nivel: item.level,
        lei: item.law
      });
    });

    return feriadosResponse;
  }

  async getFeriadosFromBrasilApi(ano: string): Promise<Feriado[] | Erro> {
    let erro: Erro = new Erro({
      estado: false
    });

    const result: AxiosResponse | void = await axios
    .get(`https://brasilapi.com.br/api/feriados/v1/${ano}`)
    .catch(function (error) {
      console.log('Erro do Axios: ' + error.message);
      erro.estado = true;
      erro.mensagem = error.response ? error.response.data : error.message;
    });

    // Tratamento de erro genérico
    if (!result || erro.estado == true) return erro;

    const feriadosResponse = result.data.map((item) => {
      return new Feriado({
        data: item.date,
        nome: item.name,
        tipo: item.type
      });
    });

    return feriadosResponse;
  }
}
