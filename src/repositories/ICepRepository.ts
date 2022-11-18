import { Cep } from "../entities/Cep";
import { Erro } from "../entities/Erro";

export interface ICepRepository {
  getCepFromViaCep(cep: string): Promise<Cep | Erro>;
  getCepFromWidenet(cep: string): Promise<Cep | Erro>;
  getCepFromInverTexto(cep: string): Promise<Cep | Erro>;
}
