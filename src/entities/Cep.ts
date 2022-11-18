export class Cep {
  public provedor: string;
  public cep: string;
  public logradouro: string;
  public complemento?: string;
  public bairro: string;
  public localidade: string;
  public uf: string;

  constructor(props: Cep) {
    Object.assign(this, props);
  }
}
