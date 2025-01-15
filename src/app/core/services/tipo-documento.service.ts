import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/service/base.service';
import {TipoDocumento} from '../models/tipoDocumento.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService extends BaseService<TipoDocumento>{
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.tipoDocumentoURL;
  }
}
