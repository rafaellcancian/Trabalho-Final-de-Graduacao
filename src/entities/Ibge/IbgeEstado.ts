import { Regiao } from "./Regiao";

export class IbgeEstado {
  public id: number;
  public sigla: string;
  public nome: string;
  public regiao: Regiao;

  constructor(props: IbgeEstado) {
    Object.assign(this, props);
  }
}
