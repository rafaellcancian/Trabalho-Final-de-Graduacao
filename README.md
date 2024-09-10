# Como executar a aplicação localmente
- Requer Node.js 18 ou superior instalado.
> Executar os seguintes comandos:
- `npm i` -> Baixa todos os módulos necessários para a execução da aplicação.
- `npm run dev` -> Inicia o servidor da aplicação localmente.
- Para realizar as consultas na API, utilizar o navegador ou programas como **Postman** e **Insomnia** baseado na documentação abaixo.

> Observações:
- O provedor **Invertexto** não funcionará sem um token especificado no `.env`, pois se trata de uma API privada que requer uma conta.
- A aplicação executará sem um banco de dados **PostgreSQL** normalmente, porém não fará os registros das requisições. Para configurar o banco de dados localmente, ver o arquivo `.env.example`.

# Documentação da API
Padronizar a forma como se acessa a API ajuda as aplicações a terem uma maior consistência, pois ao invés do desenvolvedor ter que se preocupar com a documentação de três APIs por exemplo, ele terá que se preocupar somente com uma, justamente por nela conter de maneira centralizada alguns dos dados públicos listados abaixo:
- Informações sobre o sistema bancário brasileiro.
- Código de Endereçamento Postal (CEP).
- Cadastro Nacional da Pessoa Jurídica (CNPJ).
- Discagem Direta à Distância (DDD).
- Feriados Nacionais.
- Geolocalização por IP.
- Instituto Brasileiro de Geografia e Estatística (IBGE).

## Bancos
Informações sobre o sistema bancário brasileiro.

### 1. Lista as informações de todos os bancos do Brasil utilizando dados do Banco Central
`GET` http://canciantfg.ddns.net:3000/api/bancos/v1

### Respostas
**Sucesso (200)**
```json
{
    "provedor": "Banco Central",
    "bancos": [
        {
            "ispb": "00000000",
            "nome": "BCO DO BRASIL S.A.",
            "codigo": "001",
            "nomeExtenso": "Banco do Brasil S.A.",
            "inicioDaOperacao": "22/04/2002"
        },
        {
            "ispb": "00000208",
            "nome": "BRB - BCO DE BRASILIA S.A.",
            "codigo": "070",
            "nomeExtenso": "BRB - BANCO DE BRASILIA S.A.",
            "inicioDaOperacao": "22/04/2002"
        },
        ...
    ]
}
```

***

### 2. Filtra as informações da lista a partir de um código
`GET` http://canciantfg.ddns.net:3000/api/bancos/v1?codigo=
- Parâmetro Query: `codigo` inteiro de `1` à `999`. **(Opcional)**

### Respostas
`codigo=1` - **Sucesso (200)**
```json
{
    "provedor": "Banco Central",
    "bancos": [
        {
            "ispb": "00000000",
            "nome": "BCO DO BRASIL S.A.",
            "codigo": "001",
            "nomeExtenso": "Banco do Brasil S.A.",
            "inicioDaOperacao": "22/04/2002"
        }
    ]
}
```
`codigo` inválido - **Erro interno do servidor (500)**
```json
{
    "mensagem": "Todos os serviços de Bancos retornaram erro.",
    "erros": [
        {
            "provedor": "Banco Central",
            "erro": "Código do banco solicitado não existe ou é inválido."
        }
    ]
}
```

## Cep
Informações sobre Código de Endereçamento Postal.

### 1. Busca por Cep utilizando o sistema *fallback* com múltiplos provedores
`GET` http://canciantfg.ddns.net:3000/api/cep/v1/:cep
- Parâmetro Path: `cep` *string* de tamanho `8` com a expressão regular `/^[0-9]+$/`.

### Respostas
`cep=97010041` - **Sucesso (200)**
```json
{
    "provedor": "ViaCEP",
    "cep": "97010-041",
    "logradouro": "Rua André Marques",
    "complemento": "lado ímpar",
    "bairro": "Centro",
    "localidade": "Santa Maria",
    "uf": "RS"
}
```

`cep` inválido - **Erro interno do servidor (500)**
```json
{
    "mensagem": "Todos os serviços de CEP retornaram erro.",
    "erros": [
        {
            "provedor": "ViaCEP",
            "erro": {
                "erro": true
            }
        },
        {
            "provedor": "Widenet",
            "erro": {
                "status": 404,
                "ok": false,
                "message": "CEP não encontrado",
                "statusText": "not_found"
            }
        },
        {
            "provedor": "Invertexto",
            "erro": {
                "message": "No results found."
            }
        }
    ]
}
```

***

### 2. Busca por Cep especificando o provedor
`GET` http://canciantfg.ddns.net:3000/api/cep/v1/:cep?provedor=
- Parâmetro Path: `cep` *string* de tamanho `8` com a expressão regular `/^[0-9]+$/`.
- Parâmetro Query: `provedor` *string* válida somente com as opções `viacep`, `widenet` e `invertexto`. **(Opcional)**

### Respostas
`cep=97010041` e `provedor=widenet` - **Sucesso (200)**
```json
{
    "provedor": "Widenet",
    "cep": "97010-041",
    "logradouro": "Rua André Marques - lado ímpar",
    "bairro": "Centro",
    "localidade": "Santa Maria",
    "uf": "RS"
}
```

`cep` inválido - **Erro interno do servidor (500)**
```json
{
    "mensagem": "O serviço Widenet retornou erro.",
    "erros": {
        "status": 404,
        "ok": false,
        "message": "CEP não encontrado",
        "statusText": "not_found"
    }
}
```

## Cnpj
Informações sobre Cadastro Nacional da Pessoa Jurídica.

### 1. Busca por Cnpj utilizando o provedor Minha Receita
`GET` http://canciantfg.ddns.net:3000/api/cnpj/v1/:cnpj
- Parâmetro Path: `cnpj` *string* de tamanho `14` com a expressão regular `/^[0-9]+$/`.

### Respostas
`cnpj=52429560000160` - **Sucesso (200)**
```json
{
    "provedor": "Minha Receita",
    "cnpj": "52429560000160",
    "identificadorMatrizFilial": 1,
    "descricaoIdentificadorMatrizFilial": "MATRIZ",
    "nomeFantasia": "ACOUGUE SAO BENEDITO",
    "situacaoCadastral": 8,
    "descricaoSituacaoCadastral": "BAIXADA",
    "dataSituacaoCadastral": "1988-03-31",
    "motivoSituacaoCadastral": 1,
    "descricaoMotivoSituacaoCadastral": "EXTINCAO POR ENCERRAMENTO LIQUIDACAO VOLUNTARIA",
    "nomeCidadeNoExterior": "",
    "codigoPais": null,
    "pais": null,
    "dataInicioAtividade": "1985-10-15",
    "cnaeFiscal": 4722901,
    "cnaeFiscalDescricao": "Comércio varejista de carnes - açougues",
    "descricaoTipoDeLogradouro": "RUA",
    "logradouro": "EUGENIO PAULUCCI",
    "numero": "3 79",
    "complemento": "",
    "bairro": "PS GERALDO",
    "cep": "17020700",
    "uf": "SP",
    "codigoMunicipio": 6219,
    "codigoMunicipioIbge": 3506003,
    "municipio": "BAURU",
    "dddTelefone1": "",
    "dddTelefone2": "",
    "dddFax": "",
    "situacaoEspecial": "",
    "dataSituacaoEspecial": null,
    "opcaoPeloSimples": null,
    "dataOpcaoPeloSimples": null,
    "dataExclusaoDoSimples": null,
    "opcaoPeloMei": null,
    "dataOpcaoPeloMei": null,
    "dataExclusaoDoMei": null,
    "razaoSocial": "ODAIR SEBASTIAO ZANATA",
    "codigoNaturezaJuridica": 2135,
    "naturezaJuridica": "Empresário (Individual)",
    "qualificacaoDoResponsavel": 50,
    "capitalSocial": 0,
    "codigoPorte": 5,
    "porte": "DEMAIS",
    "enteFederativoResponsavel": "",
    "descricaoPorte": "",
    "cnaesSecundarios": [
        {
            "codigo": 0,
            "descricao": ""
        }
    ]
}
```

`cnpj` inválido - **Erro interno do servidor (500)**
```json
{
    "mensagem": "Todos os serviços de CNPJ retornaram erro.",
    "erros": [
        {
            "provedor": "Minha Receita",
            "erro": {
                "message": "CNPJ 00.000.000/0000-00 não encontrado."
            }
        }
    ]
}
```

## Ddd
Informações sobre Discagem Direta à Distância.

### 1. Lista todas as cidades do respectivo prefixo utilizando o provedor Anatel
`GET` http://canciantfg.ddns.net:3000/api/ddd/v1/:prefixo
- Parâmetro Path: `prefixo` *string* de tamanho `2` com a expressão regular `/^[0-9]+$/`.

### Respostas
`prefixo=55` - **Sucesso (200)**
```json
{
    "provedor": "Anatel",
    "uf": "RS",
    "cidades": [
        "SAO PEDRO DAS MISSÕES",
        "SANTANA DO LIVRAMENTO",
        "CHIAPETA",
        "CAPAO DO CIPO",
        "VITÓRIA DAS MISSÕES",
        "VISTA GAÚCHA",
        "VISTA ALEGRE",
        "VILA NOVA DO SUL",
        "VICENTE DUTRA",
        "URUGUAIANA",
        ...
    ]
}
```

`prefixo` inválido - **Erro interno do servidor (500)**
```json
{
    "mensagem": "Todos os serviços de DDD retornaram erro.",
    "erros": [
        {
            "provedor": "Anatel",
            "erro": "DDD solicitado não existe ou é inválido."
        }
    ]
}
```

## Feriados Nacionais
Informações sobre Feriados Nacionais e Estaduais (somente com o provedor Invertexto).

### 1. Lista as informações de todos os Feriados Nacionais do respectivo ano utilizando o sistema *fallback* com múltiplos provedores
`GET` http://canciantfg.ddns.net:3000/api/feriados/v1/:ano
- Parâmetro Path: `ano` *string* com a expressão regular `/^[0-9]+$/`.

### Respostas
`ano=2022` - **Sucesso (200)**
```json
{
    "provedor": "Invertexto",
    "feriados": [
        {
            "data": "2022-01-01",
            "nome": "Confraternização Universal",
            "tipo": "feriado",
            "nivel": "nacional"
        },
        {
            "data": "2022-02-28",
            "nome": "Carnaval",
            "tipo": "facultativo",
            "nivel": "nacional"
        },
        ...
    ]
}
```

`ano` inválido - **Erro interno do servidor (500)**
```json
{
    "mensagem": "Todos os serviços de Feriados Nacionais retornaram erro.",
    "erros": [
        {
            "provedor": "Invertexto",
            "erro": {
                "message": "Server Error"
            }
        },
        {
            "provedor": "Brasil API",
            "erro": {
                "message": "Erro ao calcular feriados.",
                "type": "feriados_error",
                "name": "InternalError"
            }
        }
    ]
}
```

***

### 2. Lista as informações de todos os Feriados Nacionais do respectivo ano especificando o estado e o provedor
`GET` http://canciantfg.ddns.net:3000/api/feriados/v1/:ano?uf=&provedor=
- Parâmetro Path: `ano` *string* com a expressão regular `/^[0-9]+$/`.
- Parâmetro Query: `provedor` *string* válida somente com as opções `invertexto` e `brasilapi`. **(Opcional)**
> Somente com o provedor Invertexto:
- Parâmetro Query: `uf` *string* válida somente com uma Unidade Federativa (em maiúsculo). **(Opcional)**

### Respostas
`ano=2022`, `uf=RS` e `provedor=invertexto` - **Sucesso (200)**
```json
{
    "provedor": "Invertexto",
    "feriados": [
        ...
        {
            "data": "2022-09-20",
            "nome": "Dia do Gaúcho",
            "tipo": "feriado",
            "nivel": "estadual",
            "lei": "Art. 6, parágrafo único da constituição estadual"
        },
        {
            "data": "2022-10-12",
            "nome": "Nossa Senhora Aparecida",
            "tipo": "feriado",
            "nivel": "nacional"
        },
        ...
    ]
}
```

`ano` inválido - **Erro interno do servidor (500)**
```json
{
    "mensagem": "O serviço Invertexto retornou erro.",
    "erros": {
        "message": "Server Error"
    }
}
```

## GeoIP
Informações sobre Geolocalização por IP.

### 1. Busca por IP utilizando o provedor Invertexto
`GET` http://canciantfg.ddns.net:3000/api/geoIp/v1/:ip
- Parâmetro Path: `ip` *string* válida somente com o formato `IPv4` ou `IPv6`.

### Respostas
`ip=187.181.173.114` - **Sucesso (200)**
```json
{
    "provedor": "Invertexto",
    "cidade": null,
    "pais": "Brasil",
    "codigoPais": "BR",
    "continente": "América do Sul",
    "fusoHorario": "America/Sao_Paulo",
    "latitude": -29.7766,
    "longitude": -53.8354
}
```

`ip` inválido - **Erro interno do servidor (500)**
```json
{
    "mensagem": "Todos os serviços de GeoIp retornaram erro.",
    "erros": [
        {
            "provedor": "Invertexto",
            "erro": {
                "messsage": "No results found."
            }
        }
    ]
}
```

## Ibge Estados
Informações sobre o Instituto Brasileiro de Geografia e Estatística referente aos estados.

### 1. Lista as informações de todos os estados do Brasil utilizando dados do Ibge
`GET` http://canciantfg.ddns.net:3000/api/ibge/estados/v1

### Respostas
**Sucesso (200)**
```json
{
    "provedor": "Ibge",
    "estados": [
        {
            "id": 11,
            "sigla": "RO",
            "nome": "Rondônia",
            "regiao": {
                "id": 1,
                "sigla": "N",
                "nome": "Norte"
            }
        },
        {
            "id": 12,
            "sigla": "AC",
            "nome": "Acre",
            "regiao": {
                "id": 1,
                "sigla": "N",
                "nome": "Norte"
            }
        },
        ...
    ]
}
```

### 2. Filtra as informações da lista a partir de um estado
`GET` http://canciantfg.ddns.net:3000/api/ibge/estados/v1?uf=
- Parâmetro Query: `uf` *string* válida somente com uma Unidade Federativa (em maiúsculo). **(Opcional)**

### Respostas
`uf=RS` - **Sucesso (200)**
```json
{
    "provedor": "Ibge",
    "estados": [
        {
            "id": 43,
            "sigla": "RS",
            "nome": "Rio Grande do Sul",
            "regiao": {
                "id": 4,
                "sigla": "S",
                "nome": "Sul"
            }
        }
    ]
}
```
## Ibge Municípios
Informações sobre o Instituto Brasileiro de Geografia e Estatística referente aos municípios de cada estado.

### 1. Lista as informações de todos os municípios do respectivo estado utilizando dados do Ibge
`GET` http://canciantfg.ddns.net:3000/api/ibge/municipios/v1/:uf
- Parâmetro Path: `uf` *string* válida somente com uma Unidade Federativa (em maiúsculo).

### Respostas
`uf=RS` - **Sucesso (200)**
```json
{
    "provedor": "Ibge",
    "municipios": [
        {
            "codigoIbge": 4300034,
            "nome": "Aceguá"
        },
        {
            "codigoIbge": 4300059,
            "nome": "Água Santa"
        },
        {
            "codigoIbge": 4300109,
            "nome": "Agudo"
        },
        {
            "codigoIbge": 4300208,
            "nome": "Ajuricaba"
        },
        {
            "codigoIbge": 4300307,
            "nome": "Alecrim"
        },
        ...
    ]
}
```
