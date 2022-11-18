import { Banco } from "../entities/Banco";
import { Erro } from "../entities/Erro";

export interface IBancosRepository {
  getBancosFromBancoCentral(codigo?: number): Promise<Banco[] | Erro>
}
