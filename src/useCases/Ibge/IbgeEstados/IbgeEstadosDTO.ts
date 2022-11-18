import { IbgeEstado } from "../../../entities/Ibge/IbgeEstado";

export class IbgeEstadosRequestDTO {
  uf?: string;
  ip?: string;
}

export class IbgeEstadosResponseDTO {
  provedor: string;
  estados: IbgeEstado[];
} 
