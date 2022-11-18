export class Feriado {
  public data: string;
  public nome: string;
  public tipo: string;
  public nivel?: string;
  public lei?: string;

  constructor(props: Feriado) {
    Object.assign(this, props);
  }
}
