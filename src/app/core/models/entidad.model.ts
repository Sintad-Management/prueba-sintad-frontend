export interface Entidad {
  idEntidad: number | null;
  idTipoDocumento: number;
  nroDocumento: string;
  razonSocial: string;
  nombreComercial: string;
  idTipoContribuyente: number;
  direccion: string;
  telefono: string;
  estado: boolean;
}
