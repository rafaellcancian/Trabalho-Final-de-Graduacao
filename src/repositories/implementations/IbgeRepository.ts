import axios, { AxiosResponse } from 'axios';
import { Erro } from "../../entities/Erro";
import { IbgeEstado } from "../../entities/Ibge/IbgeEstado";
import { IbgeMunicipio } from "../../entities/Ibge/IbgeMunicipio";
import { Regiao } from '../../entities/Ibge/Regiao';
import { IIbgeRepository } from "../IIbgeRepository";

export class IbgeRepository implements IIbgeRepository {
  async getEstadosFromIbge(uf?: string): Promise<IbgeEstado[] | Erro> {
    let erro: Erro = new Erro({
      estado: false
    });

    const result: AxiosResponse | void = await axios
    .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/`)
    .catch(function (error) {
      console.log('Erro do Axios: ' + error.message);
      erro.estado = true;
      erro.mensagem = error.response ? error.response.data : error.message;
    });

    // Tratamento de erro genérico
    if (!result || erro.estado == true) return erro;

    let ibgeEstados: IbgeEstado[];
    if (uf) {
      ibgeEstados = result.data
      .filter((item) => item.sigla === uf)
      .map((item) => {
        return new IbgeEstado({
          id: item.id,
          sigla: item.sigla,
          nome: item.nome,
          regiao: new Regiao({
            id: item.regiao.id,
            sigla: item.regiao.sigla,
            nome: item.regiao.nome
          })
        });
      });
    } else {
      ibgeEstados = result.data
      .map((item) => {
        return new IbgeEstado({
          id: item.id,
          sigla: item.sigla,
          nome: item.nome,
          regiao: new Regiao({
            id: item.regiao.id,
            sigla: item.regiao.sigla,
            nome: item.regiao.nome
          })
        });
      });
    }

    return ibgeEstados;
  }

  async getMunicipiosFromIbge(uf: string): Promise<IbgeMunicipio[] | Erro> {
    let erro: Erro = new Erro({
      estado: false
    });

    const result: AxiosResponse | void = await axios
    .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
    .catch(function (error) {
      console.log('Erro do Axios: ' + error.message);
      erro.estado = true;
      erro.mensagem = error.response ? error.response.data : error.message;
    });

    // Tratamento de erro genérico
    if (!result || erro.estado == true) return erro;

    const ibgeMunicipios: IbgeMunicipio[] = result.data.map((item) => {
      return new IbgeMunicipio({
        codigoIbge: item.id,
        nome: item.nome
      });
    });

    return ibgeMunicipios;
  }
}
