import { Component, OnInit } from '@angular/core';
import { EntityTableComponent } from '../../shared/components/entity-table/entity-table.component';
import { FormModalComponent } from '../../shared/components/form-modal/form-modal.component';
import { NgIf } from '@angular/common';
import { Entidad } from '../../core/models/entidad.model';
import { EntidadService } from '../../core/services/entidad.service';
import { TipoContribuyente } from '../../core/models/tipoContribuyente.model';
import { TipoDocumento } from '../../core/models/tipoDocumento.model';
import { TipoContribuyenteService } from '../../core/services/tipo-contribuyente.service';
import { TipoDocumentoService } from '../../core/services/tipo-documento.service';

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
export class EntidadComponent implements OnInit {
  entidades: Entidad[] = [];
  isModalOpen = false;
  entidadSeleccionada: Entidad | null = null;
  tiposDocumento: TipoDocumento[] = [];
  tiposContribuyente: TipoContribuyente[] = [];

  columns = [
    {key: 'idEntidad', label: 'ID'},
    {key: 'razonSocial', label: 'Razón Social'},
    {key: 'nombreComercial', label: 'Nombre Comercial'},
    {key: 'tipoDocumento.nombre', label: 'Tipo Documento'},
    {key: 'nroDocumento', label: 'Nro Documento'},
    {key: 'tipoContribuyente.nombre', label: 'Tipo Contribuyente'},
    {key: 'direccion', label: 'Dirección'},
    {key: 'telefono', label: 'Teléfono'},
    {key: 'estado', label: 'Estado'}
  ];
  fields = [
    {key: 'razonSocial', label: 'Razón Social', type: 'text'},
    {key: 'nombreComercial', label: 'Nombre Comercial', type: 'text'},
    {key: 'tipoDocumentoId', label: 'Tipo Documento', type: 'select'},
    {key: 'nroDocumento', label: 'Nro Documento', type: 'text'},
    {key: 'tipoContribuyenteId', label: 'Tipo Contribuyente', type: 'select'},
    {key: 'direccion', label: 'Dirección', type: 'text'},
    {key: 'telefono', label: 'Teléfono', type: 'text'},
    {key: 'estado', label: 'Estado', type: 'checkbox'}
  ];

  constructor(
    private entidadService: EntidadService,
    private tipoDocumentoService: TipoDocumentoService,
    private tipoContribuyenteService: TipoContribuyenteService
  ) {
  }

  ngOnInit(): void {
    this.loadEntidades();
    this.loadTiposDocumento();
    this.loadTiposContribuyente();
  }

  loadEntidades(): void {
    this.entidadService.getAll().subscribe(data => {
      this.entidades = data.map(entidad => ({
        ...entidad,
        'tipoDocumento.nombre': entidad.tipoDocumento?.nombre,
        'tipoContribuyente.nombre': entidad.tipoContribuyente?.nombre
      }));
    });
  }

  loadTiposDocumento(): void {
    this.tipoDocumentoService.getAll().subscribe(data => {
      console.log('Tipos de Documento:', data);
      this.tiposDocumento = data;
    });
  }

  loadTiposContribuyente(): void {
    this.tipoContribuyenteService.getAll().subscribe(data => {
      console.log('Tipos de Contribuyente:', data);
      this.tiposContribuyente = data;
    });
  }


  abrirModal(): void {
    this.isModalOpen = true;
  }

  cerrarModal(): void {
    this.isModalOpen = false;
    this.entidadSeleccionada = null;
  }

  guardarEntidad(entidad: Entidad): void {

    const entidadToSave = {
      ...entidad,
      tipoDocumentoId: entidad.tipoDocumento?.id || null,
      tipoContribuyenteId: entidad.tipoContribuyente?.id || null
    };

    if (!entidadToSave.tipoDocumentoId) {
      console.error('El campo tipoDocumentoId no puede ser null');
      return;
    }

    if (!entidadToSave.tipoContribuyenteId) {
      console.error('El campo tipoContribuyenteId no puede ser null');
      return;
    }

    if (this.entidadSeleccionada?.idEntidad) {
      this.entidadService.update(this.entidadSeleccionada.idEntidad, entidadToSave).subscribe(
        () => {
          this.loadEntidades();
          this.cerrarModal();
        },
        error => console.error('Error al actualizar la entidad:', error)
      );
    } else {
      this.entidadService.create(entidadToSave).subscribe(
        () => {
          this.loadEntidades();
          this.cerrarModal();
        },
        error => console.error('Error al crear la entidad:', error)
      );
    }
  }

  editarEntidad(entidad: Entidad): void {
    this.entidadSeleccionada = entidad;
    this.abrirModal();
  }

  eliminarEntidad(entidad: Entidad): void {
    this.entidadService.delete(entidad.idEntidad).subscribe(() => {
      this.loadEntidades();
    });
  }
}
