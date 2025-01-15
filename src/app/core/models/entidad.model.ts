import {TipoContribuyente} from './tipoContribuyente.model';
import {TipoDocumento} from './tipoDocumento.model';

export interface Entidad {
  idEntidad: number;
  razonSocial: string;
  nombreComercial: string;
  tipoDocumento?: TipoDocumento;
  nroDocumento: string;
  tipoContribuyente?: TipoContribuyente;
  direccion: string;
  telefono: string;
  estado: boolean;
}
