import axios, { AxiosResponse } from 'axios';
import { Cep } from '../../entities/Cep';
import { Erro } from '../../entities/Erro';
import { invertextoApiToken } from '../../util/environment';
import { ICepRepository } from '../ICepRepository';

export class CepRepository implements ICepRepository {
  async getCepFromViaCep(cep: string): Promise<Cep | Erro> {
    let erro: Erro = new Erro({
      estado: false
    });

    const result: AxiosResponse | void = await axios
    .get(`https://viacep.com.br/ws/${cep}/json/`)
    .catch(function (error) {
      console.log('Erro do Axios: ' + error.message);
      erro.estado = true;
      erro.mensagem = error.response ? error.response.data : error.message;
    });

    // Tratamento de erro genérico
    if (!result || erro.estado == true) return erro;

    // Tratamento de erro específico do provedor
    if (result.data.erro == true) {
      erro = new Erro({
        estado: true,
        mensagem: result.data
      });
      return erro;
    }

    const cepResponse = new Cep({
      provedor: 'ViaCEP',
      cep: result.data.cep,
      logradouro: result.data.logradouro,
      complemento: result.data.complemento,
      bairro: result.data.bairro,
      localidade: result.data.localidade,
      uf: result.data.uf
    });

    return cepResponse;
  }

  async getCepFromWidenet(cep: string): Promise<Cep | Erro> {
    let erro: Erro = new Erro({
      estado: false
    });

    const result: AxiosResponse | void = await axios
    .get(`https://ws.apicep.com/busca-cep/api/cep/${cep}.json`)
    .catch(function (error) {
      console.log('Erro do Axios: ' + error.message);
      erro.estado = true;
      erro.mensagem = error.response ? error.response.data : error.message;
    });

    // Tratamento de erro genérico
    if (!result || erro.estado == true) return erro;

    // Tratamento de erro específico do provedor
    if (result.data.ok == false) {
      erro = new Erro({
        estado: true,
        mensagem: result.data
      });
      return erro;
    }

    const cepResponse = new Cep({
      provedor: 'Widenet',
      cep: result.data.code,
      logradouro: result.data.address,
      bairro: result.data.district,
      localidade: result.data.city,
      uf: result.data.state
    });

    return cepResponse;
  }

  async getCepFromInverTexto(cep: string): Promise<Cep | Erro> {
    let erro: Erro = new Erro({
      estado: false
    });

    const token = invertextoApiToken;

    const result: AxiosResponse | void = await axios
    .get(`https://api.invertexto.com/v1/cep/${cep}?token=${token}`)
    .catch(function (error) {
      console.log('Erro do Axios: ' + error.message);
      erro.estado = true;
      erro.mensagem = error.response ? error.response.data : error.message;
    });

    // Tratamento de erro genérico
    if (!result || erro.estado == true) return erro;

    const cepResponse = new Cep({
      provedor: 'Invertexto',
      cep: result.data.cep,
      logradouro: result.data.street,
      bairro: result.data.neighborhood,
      localidade: result.data.city,
      uf: result.data.state
    });

    return cepResponse;
  }
}
