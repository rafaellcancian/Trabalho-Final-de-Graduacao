export class Ddd {
  public provedor: string;
  public uf: string;
  public cidades: string[];

  constructor(props: Ddd) {
    Object.assign(this, props);
  }
}
