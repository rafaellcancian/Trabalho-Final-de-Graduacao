export class Banco {
  public ispb: string;
  public nome: string;
  public codigo: string;
  public nomeExtenso: string;
  public inicioDaOperacao: string;

  constructor(props: Banco) {
    Object.assign(this, props);
  }
}
