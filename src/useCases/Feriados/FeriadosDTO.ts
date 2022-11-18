import { Feriado } from "../../entities/Feriado";

export class FeriadosRequestDTO {
  ano: string;
  uf?: string;
  provedor?: string;
  ip?: string;
}

export class FeriadosResponseDTO {
  provedor: string;
  feriados: Feriado[];
} 
