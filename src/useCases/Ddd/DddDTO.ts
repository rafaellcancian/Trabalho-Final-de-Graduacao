export class DddRequestDTO {
  prefixo: string;
  ip?: string;
}

export class DddResponseDTO {
  uf: string;
  cidades: string[];
}
