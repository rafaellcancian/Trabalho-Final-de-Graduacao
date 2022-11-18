import { IbgeMunicipio } from "../../../entities/Ibge/IbgeMunicipio";

export class IbgeMunicipiosRequestDTO {
  uf: string;
  ip?: string;
}

export class IbgeMunicipiosResponseDTO {
  provedor: string;
  municipios: IbgeMunicipio[];
} 
