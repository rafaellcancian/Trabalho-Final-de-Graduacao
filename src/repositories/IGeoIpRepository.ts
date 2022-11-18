import { Erro } from "../entities/Erro";
import { GeoIp } from "../entities/GeoIp";

export interface IGeoIpRepository {
  getGeoIpFromInvertexto(ip: string): Promise<GeoIp | Erro>;
}
