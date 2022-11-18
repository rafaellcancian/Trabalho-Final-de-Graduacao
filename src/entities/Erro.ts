export class Erro {
  public estado: boolean;
  public mensagem?: any;

  constructor(props: Erro) {
    Object.assign(this, props);
  }
}
