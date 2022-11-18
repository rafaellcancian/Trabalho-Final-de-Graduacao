import { Ddd } from "../entities/Ddd";
import { Erro } from "../entities/Erro";

export interface IDddRepository {
  getDddFromAnatel(prefixo: string): Promise<Ddd | Erro>;
}
