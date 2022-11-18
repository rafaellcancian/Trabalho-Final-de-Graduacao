import { Erro } from "../entities/Erro";
import { Feriado } from "../entities/Feriado";

export interface IFeriadosRepository {
  getFeriadosFromInvertexto(ano: string, uf?: string): Promise<Feriado[] | Erro>;
  getFeriadosFromBrasilApi(ano: string): Promise<Feriado[] | Erro>;
}
