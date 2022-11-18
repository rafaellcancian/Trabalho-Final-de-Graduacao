import { CnaesSecundarios } from "../../entities/Cnpj/CnaesSecundarios";
import { Qsa } from "../../entities/Cnpj/Qsa";

export class CnpjRequestDTO {
  cnpj: string;
  ip?: string;
}

export class CnpjResponseDTO {
  provedor: string;
  cnpj: string;
  identificadorMatrizFilial: number;
  descricaoIdentificadorMatrizFilial: string;
  nomeFantasia: string;
  situacaoCadastral: number;
  descricaoSituacaoCadastral: string;
  dataSituacaoCadastral: string;
  motivoSituacaoCadastral: number;
  descricaoMotivoSituacaoCadastral: string;
  nomeCidadeNoExterior: string;
  codigoPais?: string;
  pais?: string;
  dataInicioAtividade: string;
  cnaeFiscal: number;
  cnaeFiscalDescricao: string;
  descricaoTipoDeLogradouro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  uf: string;
  codigoMunicipio: number;
  codigoMunicipioIbge: number;
  municipio: string;
  dddTelefone1: string;
  dddTelefone2: string;
  dddFax: string;
  situacaoEspecial: string;
  dataSituacaoEspecial?: string;
  opcaoPeloSimples?: string;
  dataOpcaoPeloSimples?: string;
  dataExclusaoDoSimples?: string;
  opcaoPeloMei?: string;
  dataOpcaoPeloMei?: string;
  dataExclusaoDoMei?: string;
  razaoSocial: string;
  codigoNaturezaJuridica: number;
  naturezaJuridica: string;
  qualificacaoDoResponsavel: number;
  capitalSocial: number;
  codigoPorte: number;
  porte: string;
  enteFederativoResponsavel?: string;
  descricaoPorte: string;
  qsa?: Qsa[];
  cnaesSecundarios?: CnaesSecundarios[];
}
