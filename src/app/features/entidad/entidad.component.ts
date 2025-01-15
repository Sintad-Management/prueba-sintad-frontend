import { Component } from '@angular/core';
import { EntityTableComponent } from '../../shared/components/entity-table/entity-table.component';
import { FormModalComponent } from '../../shared/components/form-modal/form-modal.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-entidad',
  imports: [
    EntityTableComponent,
    FormModalComponent,
    NgIf
  ],
  templateUrl: './entidad.component.html',
  standalone: true,
  styleUrls: ['./entidad.component.css']
})
export class EntidadComponent {
  entidades = [
    { idEntidad: 1, razonSocial: 'Entidad 1', nombreComercial: 'Comercial 1', idTipoDocumento: 1, nroDocumento: '123456', idTipoContribuyente: 1, direccion: 'Dirección 1', telefono: '123456789', estado: true },
    { idEntidad: 2, razonSocial: 'Entidad 2', nombreComercial: 'Comercial 2', idTipoDocumento: 2, nroDocumento: '654321', idTipoContribuyente: 2, direccion: 'Dirección 2', telefono: '987654321', estado: false }
  ];
  isModalOpen = false;
  entidadSeleccionada: any = null;
  tiposDocumento = [
    { id: 1, nombre: 'DNI' },
    { id: 2, nombre: 'RUC' }
  ];
  tiposContribuyente = [
    { id: 1, nombre: 'Persona Natural' },
    { id: 2, nombre: 'Persona Jurídica' }
  ];
  columns = [
    { key: 'idEntidad', label: 'ID' },
    { key: 'razonSocial', label: 'Razón Social' },
    { key: 'nombreComercial', label: 'Nombre Comercial' },
    { key: 'idTipoDocumento', label: 'Tipo Documento' },
    { key: 'nroDocumento', label: 'Nro Documento' },
    { key: 'idTipoContribuyente', label: 'Tipo Contribuyente' },
    { key: 'direccion', label: 'Dirección' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'estado', label: 'Estado' }
  ];
  fields = [
    { key: 'razonSocial', label: 'Razón Social', type: 'text' },
    { key: 'nombreComercial', label: 'Nombre Comercial', type: 'text' },
    { key: 'idTipoDocumento', label: 'Tipo Documento', type: 'select' },
    { key: 'nroDocumento', label: 'Nro Documento', type: 'text' },
    { key: 'idTipoContribuyente', label: 'Tipo Contribuyente', type: 'select' },
    { key: 'direccion', label: 'Dirección', type: 'text' },
    { key: 'telefono', label: 'Teléfono', type: 'text' },
    { key: 'estado', label: 'Estado', type: 'checkbox' }
  ];

  abrirModal(): void {
    this.isModalOpen = true;
    this.entidadSeleccionada = {};
  }

  cerrarModal(): void {
    this.isModalOpen = false;
    this.entidadSeleccionada = null;
  }

  guardarEntidad(entidad: any): void {
    if (this.entidadSeleccionada && this.entidadSeleccionada.idEntidad) {
      const index = this.entidades.findIndex(e => e.idEntidad === this.entidadSeleccionada.idEntidad);
      if (index !== -1) {
        this.entidades[index] = entidad;
      }
    } else {
      entidad.idEntidad = this.entidades.length + 1;
      this.entidades.push(entidad);
    }
    this.cerrarModal();
  }

  editarEntidad(entidad: any): void {
    this.entidadSeleccionada = entidad;
    this.abrirModal();
  }

  eliminarEntidad(entidad: any): void {
    this.entidades = this.entidades.filter(e => e.idEntidad !== entidad.idEntidad);
  }
}
