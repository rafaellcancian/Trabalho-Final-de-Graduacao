export class Qsa {
  public identificadorDeSocio: number;
  public nomeSocio: string;
  public cnpjCpfDoSocio: string;
  public codigoQualificacaoSocio: number;
  public qualificacaoSocio: string;
  public dataEntradaSociedade: string;
  public codigoPais?: string;
  public pais?: string;
  public cpfRepresentanteLegal: string;
  public nomeRepresentanteLegal: string;
  public codigoQualificacaoRepresentanteLegal: number;
  public qualificacaoRepresentanteLegal?: string;
  public codigoFaixaEtaria: number;
  public faixaEtaria: string;

  constructor(props: Qsa) {
    Object.assign(this, props);
  }
}
