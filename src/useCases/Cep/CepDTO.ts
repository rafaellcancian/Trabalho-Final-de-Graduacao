export class CepRequestDTO {
  cep: string;
  provedor?: string;
  ip?: string;
}

export class CepResponseDTO {
  provedor: string;
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
}
