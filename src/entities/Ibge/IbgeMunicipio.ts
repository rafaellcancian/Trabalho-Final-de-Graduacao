export class IbgeMunicipio {
  public codigoIbge: number;
  public nome: string;

  constructor(props: IbgeMunicipio) {
    Object.assign(this, props);
  }
}
