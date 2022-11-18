export class GeoIp {
  public provedor: string;
  public cidade: string;
  public pais: string;
  public codigoPais: string;
  public continente: string;
  public fusoHorario: string;
  public latitude: number;
  public longitude: number;

  constructor(props: GeoIp) {
    Object.assign(this, props);
  }
}
