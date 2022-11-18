export class Regiao {
  public id: number;
  public sigla: string;
  public nome: string;

  constructor(props: Regiao) {
    Object.assign(this, props);
  }
}
