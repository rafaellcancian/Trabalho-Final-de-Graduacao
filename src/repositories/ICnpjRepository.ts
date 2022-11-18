import { Cnpj } from '../entities/Cnpj/Cnpj';
import { Erro } from '../entities/Erro';

export interface ICnpjRepository {
  getCnpjFromMinhaReceita(cnpj: string): Promise<Cnpj | Erro>;
}
