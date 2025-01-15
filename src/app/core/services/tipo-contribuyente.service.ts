import { Injectable } from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../../shared/service/base.service';
import {TipoContribuyente} from '../models/tipoContribuyente.model';

@Injectable({
  providedIn: 'root'
})
export class TipoContribuyenteService extends BaseService<TipoContribuyente> {
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.tipoContribuyenteURL;
  }
}
