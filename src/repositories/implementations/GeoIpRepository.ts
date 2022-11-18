import axios, { AxiosResponse } from 'axios';
import { Erro } from "../../entities/Erro";
import { GeoIp } from "../../entities/GeoIp";
import { invertextoApiToken } from '../../util/environment';
import { IGeoIpRepository } from "../IGeoIpRepository";

export class GeoIpRepository implements IGeoIpRepository {
  async getGeoIpFromInvertexto(ip: string): Promise<GeoIp | Erro> {
    let erro: Erro = new Erro({
      estado: false
    });

    const token = invertextoApiToken;

    const result: AxiosResponse | void = await axios
    .get(`https://api.invertexto.com/v1/geoip/${ip}?token=${token}`)
    .catch(function (error) {
      console.log('Erro do Axios: ' + error.message);
      erro.estado = true;
      erro.mensagem = error.response ? error.response.data : error.message;
    });

    // Tratamento de erro genérico
    if (!result || erro.estado == true) return erro;

    const geoIpResponse = new GeoIp({
      provedor: 'Invertexto',
      cidade: result.data.city,
      pais: result.data.country,
      codigoPais: result.data.country_code,
      continente: result.data.continent,
      fusoHorario: result.data.time_zone,
      latitude: result.data.latitude,
      longitude: result.data.longitude
    });

    return geoIpResponse;
  }
}
