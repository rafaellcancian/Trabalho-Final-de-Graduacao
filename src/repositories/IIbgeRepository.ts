import { Erro } from "../entities/Erro";
import { IbgeMunicipio } from "../entities/Ibge/IbgeMunicipio";
import { IbgeEstado } from "../entities/Ibge/IbgeEstado";

export interface IIbgeRepository {
  getEstadosFromIbge(uf?: string): Promise<IbgeEstado[] | Erro>;
  getMunicipiosFromIbge(uf: string): Promise<IbgeMunicipio[] | Erro>;
}
