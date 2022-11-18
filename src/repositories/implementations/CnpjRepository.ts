import { Cnpj } from '../../entities/Cnpj/Cnpj';
import { ICnpjRepository } from './../ICnpjRepository';
import axios, { AxiosResponse } from 'axios';
import { Qsa } from '../../entities/Cnpj/Qsa';
import { CnaesSecundarios } from '../../entities/Cnpj/CnaesSecundarios';
import { Erro } from '../../entities/Erro';

export class CnpjRepository implements ICnpjRepository {
  async getCnpjFromMinhaReceita(cnpj: string): Promise<Cnpj | Erro> {
    let erro: Erro = new Erro({
      estado: false
    });

    const result: AxiosResponse | void = await axios
    .get(`https://minhareceita.org/${cnpj}`)
    .catch(function (error) {
      console.log('Erro do Axios: ' + error.message);
      erro.estado = true;
      erro.mensagem = error.response ? error.response.data : error.message;
    });

    // Tratamento de erro genérico
    if (!result || erro.estado == true) return erro;

    const cnpjResponse = new Cnpj({
      provedor: 'Minha Receita',
      cnpj: result.data.cnpj,
      identificadorMatrizFilial: result.data.identificador_matriz_filial,
      descricaoIdentificadorMatrizFilial: result.data.descricao_identificador_matriz_filial,
      nomeFantasia: result.data.nome_fantasia,
      situacaoCadastral: result.data.situacao_cadastral,
      descricaoSituacaoCadastral: result.data.descricao_situacao_cadastral,
      dataSituacaoCadastral: result.data.data_situacao_cadastral,
      motivoSituacaoCadastral: result.data.motivo_situacao_cadastral,
      descricaoMotivoSituacaoCadastral: result.data.descricao_motivo_situacao_cadastral,
      nomeCidadeNoExterior: result.data.nome_cidade_no_exterior,
      codigoPais: result.data.codigo_pais,
      pais: result.data.pais,
      dataInicioAtividade: result.data.data_inicio_atividade,
      cnaeFiscal: result.data.cnae_fiscal,
      cnaeFiscalDescricao: result.data.cnae_fiscal_descricao,
      descricaoTipoDeLogradouro: result.data.descricao_tipo_de_logradouro,
      logradouro: result.data.logradouro,
      numero: result.data.numero,
      complemento: result.data.complemento,
      bairro: result.data.bairro,
      cep: result.data.cep,
      uf: result.data.uf,
      codigoMunicipio: result.data.codigo_municipio,
      codigoMunicipioIbge: result.data.codigo_municipio_ibge,
      municipio: result.data.municipio,
      dddTelefone1: result.data.ddd_telefone_1,
      dddTelefone2: result.data.ddd_telefone_2,
      dddFax: result.data.ddd_fax,
      situacaoEspecial: result.data.situacao_especial,
      dataSituacaoEspecial: result.data.data_situacao_especial,
      opcaoPeloSimples: result.data.opcao_pelo_simples,
      dataOpcaoPeloSimples: result.data.data_opcao_pelo_simples,
      dataExclusaoDoSimples: result.data.data_exclusao_do_simples,
      opcaoPeloMei: result.data.opcao_pelo_mei,
      dataOpcaoPeloMei: result.data.data_opcao_pelo_mei,
      dataExclusaoDoMei: result.data.data_exclusao_do_mei,
      razaoSocial: result.data.razao_social,
      codigoNaturezaJuridica: result.data.codigo_natureza_juridica,
      naturezaJuridica: result.data.natureza_juridica,
      qualificacaoDoResponsavel: result.data.qualificacao_do_responsavel,
      capitalSocial: result.data.capital_social,
      codigoPorte: result.data.codigo_porte,
      porte: result.data.porte,
      enteFederativoResponsavel: result.data.ente_federativo_responsavel,
      descricaoPorte: result.data.descricao_porte,
      qsa: result.data.qsa?.map((item) => {
        return new Qsa({
          identificadorDeSocio: item.identificador_de_socio,
          nomeSocio: item.nome_socio,
          cnpjCpfDoSocio: item.cnpj_cpf_do_socio,
          codigoQualificacaoSocio: item.codigo_qualificacao_socio,
          qualificacaoSocio: item.qualificacao_socio,
          dataEntradaSociedade: item.data_entrada_sociedade,
          codigoPais: item.codigo_pais,
          pais: item.pais,
          cpfRepresentanteLegal: item.cpf_representante_legal,
          nomeRepresentanteLegal: item.nome_representante_legal,
          codigoQualificacaoRepresentanteLegal: item.codigo_qualificacao_representante_legal,
          qualificacaoRepresentanteLegal: item.qualificacao_representante_legal,
          codigoFaixaEtaria: item.codigo_faixa_etaria,
          faixaEtaria: item.faixa_etaria
        });
      }),
      cnaesSecundarios: result.data.cnaes_secundarios?.map((item) => {
        return new CnaesSecundarios({
          codigo: item.codigo,
          descricao: item.descricao
        });
      })
    });

    return cnpjResponse;
  }
}
