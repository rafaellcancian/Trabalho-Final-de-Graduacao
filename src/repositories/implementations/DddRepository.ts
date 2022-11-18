import axios, { AxiosResponse } from 'axios';
import { Ddd } from '../../entities/Ddd';
import { Erro } from '../../entities/Erro';
import { IDddRepository } from '../IDddRepository';

export class DddRepository implements IDddRepository {
  async getDddFromAnatel(prefixo: string): Promise<Ddd | Erro> {
    let erro: Erro = new Erro({
      estado: false
    });

    const result: AxiosResponse | void = await axios({
      url: 'https://www.anatel.gov.br/dadosabertos/PDA/Codigo_Nacional/PGCN.csv',
      method: 'get',
      responseEncoding: 'binary',
    })
    .catch(function (error) {
      console.log('Erro do Axios: ' + error.message);
      erro.estado = true;
      erro.mensagem = error.response ? error.response.data : error.message;
    });

    // Tratamento de erro genérico
    if (!result || erro.estado == true) return erro;

    // Converte para String e separa em linhas
    const quebraDeLinha = '\r\n';
    const linhas = result.data.toString().split(quebraDeLinha);
    
    // Remove o primeiro elemento do Array
    linhas.shift();

    // Separa os elementos contidos nas linhas
    const elementosSeparados = linhas.map((linha) => linha.split(';'));

    // Cria um array com todas as informações da requisição formatadas
    const arrayDdds = elementosSeparados.map(([codigoIbge, uf, cidade, prefixo]) => {
      return {
        codigoIbge,
        uf,
        cidade,
        prefixo
      };
    });

    // Filtra os elementos pelo prefixo passado por parâmetro
    const arrayPrefixoEscolhido: any[] = arrayDdds.filter((item) => item.prefixo === prefixo);

    if (arrayPrefixoEscolhido.length == 0) {
      erro = new Erro({
        estado: true,
        mensagem: 'DDD solicitado não existe ou é inválido.'
      });
      return erro;
    }

    const { uf } = arrayPrefixoEscolhido[0];
    const cidades = arrayPrefixoEscolhido.map((item) => item.cidade);

    const ddd = new Ddd({
      provedor: 'Anatel',
      uf,
      cidades
    })

    return ddd;
  }
}
