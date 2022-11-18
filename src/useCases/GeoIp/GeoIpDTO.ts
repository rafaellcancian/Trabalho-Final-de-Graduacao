export class GeoIpRequestDTO {
  ip: string;
  ipLog?: string;
}

export class GeoIpResponseDTO {
  provedor: string;
  cidade: string;
  pais: string;
  codigoPais: string;
  continente: string;
  fusoHorario: string;
  latitude: number;
  longitude: number;
} 
