import {TipoContribuyente} from './tipoContribuyente.model';
import {TipoDocumento} from './tipoDocumento.model';

export interface Entidad {
  idEntidad: number;
  razonSocial: string;
  nombreComercial: string;
  tipoDocumento?: TipoDocumento;
  tipoDocumentoId: number;
  nroDocumento: string;
  tipoContribuyente?: TipoContribuyente;
  tipoContribuyenteId: number;
  direccion: string;
  telefono: string;
  estado: boolean;
}
