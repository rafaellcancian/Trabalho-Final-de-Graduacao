import { CnaesSecundarios } from "./CnaesSecundarios";
import { Qsa } from "./Qsa";

export class Cnpj {
  public provedor: string;
  public cnpj: string;
  public identificadorMatrizFilial: number;
  public descricaoIdentificadorMatrizFilial: string;
  public nomeFantasia: string;
  public situacaoCadastral: number;
  public descricaoSituacaoCadastral: string;
  public dataSituacaoCadastral: string;
  public motivoSituacaoCadastral: number;
  public descricaoMotivoSituacaoCadastral: string;
  public nomeCidadeNoExterior: string;
  public codigoPais?: string;
  public pais?: string;
  public dataInicioAtividade: string;
  public cnaeFiscal: number;
  public cnaeFiscalDescricao: string;
  public descricaoTipoDeLogradouro: string;
  public logradouro: string;
  public numero: string;
  public complemento: string;
  public bairro: string;
  public cep: string;
  public uf: string;
  public codigoMunicipio: number;
  public codigoMunicipioIbge: number;
  public municipio: string;
  public dddTelefone1: string;
  public dddTelefone2: string;
  public dddFax: string;
  public situacaoEspecial: string;
  public dataSituacaoEspecial?: string;
  public opcaoPeloSimples?: string;
  public dataOpcaoPeloSimples?: string;
  public dataExclusaoDoSimples?: string;
  public opcaoPeloMei?: string;
  public dataOpcaoPeloMei?: string;
  public dataExclusaoDoMei?: string;
  public razaoSocial: string;
  public codigoNaturezaJuridica: number;
  public naturezaJuridica: string;
  public qualificacaoDoResponsavel: number;
  public capitalSocial: number;
  public codigoPorte: number;
  public porte: string;
  public enteFederativoResponsavel?: string;
  public descricaoPorte: string;
  public qsa?: Qsa[];
  public cnaesSecundarios?: CnaesSecundarios[];

  constructor(props: Cnpj) {
    Object.assign(this, props);
  }
}
