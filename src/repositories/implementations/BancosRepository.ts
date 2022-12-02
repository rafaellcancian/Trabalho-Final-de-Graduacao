import axios, { AxiosResponse } from 'axios';
import { Banco } from "../../entities/Banco";
import { Erro } from "../../entities/Erro";
import { IBancosRepository } from "../IBancosRepository";

export class BancosRepository implements IBancosRepository {
  async getBancosFromBancoCentral(codigo?: number): Promise<Banco[] | Erro> {
    let erro: Erro = new Erro({
      estado: false
    });

    const result: AxiosResponse | void = await axios
    .get(`https://www.bcb.gov.br/pom/spb/estatistica/port/ParticipantesSTRport.csv`)
    .catch(function (error) {
      console.log('Erro do Axios: ' + error.message);
      erro.estado = true;
      erro.mensagem = error.response ? error.response.data : error.message;
    });

    // Tratamento de erro genérico
    if (!result || erro.estado == true) return erro;

    // Converte para String e separa em linhas
    const quebraDeLinha = '\r\n';
    const linhas = result.data.split(quebraDeLinha);
    
    // Remove o primeiro elemento do Array
    linhas.shift();

    // Separa os elementos contidos nas linhas
    const elementosSeparados = linhas.map((linha) => {
      if (linha.startsWith('"') && linha.endsWith('"')) {
        linha = linha.substring(1, linha.length - 1); // Retira o primeiro e o último caractere da linha
        linha = linha.replace(/""/g, '"'); // Substitui "" por "
        return linha.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g); // Separa apenas as vírgulas fora das aspas
      } else {
        return linha.split(',');
      }
    });

    // Cria um array com todas as informações da requisição formatadas e validadas
    const arrayBancos = elementosSeparados
    .filter(([ispb]) => ispb)
    .map(([
      isbp, 
      nome, 
      codigo, 
      participa, 
      acessoPrincipal, 
      nomeExtenso, 
      inicioDaOperacao
    ]) => {
      if (codigo == 'n/a') codigo = null;
      nomeExtenso = nomeExtenso.replace(/['"]+/g, ''); // Retira as aspas dentro da string
      return {
        isbp,
        nome: nome && nome.trim(), // Remove espaços em branco
        codigo,
        nomeExtenso: nomeExtenso && nomeExtenso.trim(), // Remove espaços em branco
        inicioDaOperacao
      };
    });

    let bancos;
    if (codigo) {
      bancos = arrayBancos
      .filter((item) => Number(item.codigo) === codigo)
      .map((item) => {
        return new Banco({
          ispb: item.isbp,
          nome: item.nome,
          codigo: item.codigo,
          nomeExtenso: item.nomeExtenso,
          inicioDaOperacao: item.inicioDaOperacao
        });
      });
      
      if (bancos.length == 0) {
        erro = new Erro({
          estado: true,
          mensagem: 'Código do banco solicitado não existe ou é inválido.'
        });
        return erro;
      }
    } else {
      bancos = arrayBancos
      .map((item) => {
        return new Banco({
          ispb: item.isbp,
          nome: item.nome,
          codigo: item.codigo,
          nomeExtenso: item.nomeExtenso,
          inicioDaOperacao: item.inicioDaOperacao
        });
      });
    }

    return bancos;
  }
}
