import { Banco } from "../../entities/Banco";

export class BancosRequestDTO {
  codigo?: number;
  ip?: string;
}

export class BancosResponseDTO {
  provedor: string;
  bancos: Banco[];
} 
