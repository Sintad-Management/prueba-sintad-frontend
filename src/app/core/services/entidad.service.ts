import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/service/base.service';
import {Entidad} from '../models/entidad.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EntidadService extends BaseService<Entidad> {
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.entidadURL;
  }
}
