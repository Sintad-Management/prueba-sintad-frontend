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
import { NotificationService } from '../../shared/service/notification.service';
import {Validators} from '@angular/forms';

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
    {key: 'razonSocial', label: 'Razón Social', type: 'text', validations: [Validators.required, Validators.minLength(3)]},
    {key: 'nombreComercial', label: 'Nombre Comercial', type: 'text', validations: [Validators.required, Validators.minLength(3)]},
    {key: 'tipoDocumentoId', label: 'Tipo Documento', type: 'select', validations: [Validators.required]},
    {key: 'nroDocumento', label: 'Nro Documento', type: 'text', validations: [Validators.required, Validators.minLength(8), Validators.maxLength(20)]},
    {key: 'tipoContribuyenteId', label: 'Tipo Contribuyente', type: 'select', validations: [Validators.required]},
    {key: 'direccion', label: 'Dirección', type: 'text', validations: [Validators.maxLength(255)]},
    {key: 'telefono', label: 'Teléfono', type: 'text', validations: [Validators.pattern(/^\d{7,10}$/)]},
    {key: 'estado', label: 'Estado', type: 'checkbox'}
  ];

  constructor(
    private entidadService: EntidadService,
    private tipoDocumentoService: TipoDocumentoService,
    private tipoContribuyenteService: TipoContribuyenteService,
    private notificationService: NotificationService
  ) {}

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
      this.tiposDocumento = data.map(d => ({ ...d, id: +d.id }));
    });
  }

  loadTiposContribuyente(): void {
    this.tipoContribuyenteService.getAll().subscribe(data => {
      this.tiposContribuyente = data.map(c => ({ ...c, id: +c.id }));
    });
  }

  abrirModal(): void {
    this.isModalOpen = true;
  }

  cerrarModal(): void {
    this.isModalOpen = false;
    this.entidadSeleccionada = null;
  }

  async guardarEntidad(entidad: Entidad): Promise<void> {
    console.log('Datos recibidos para guardar:', entidad);

    const entidadToSave = {
      ...entidad,
      tipoDocumentoId: +entidad.tipoDocumentoId,
      tipoContribuyenteId: +entidad.tipoContribuyenteId
    };

    if (entidadToSave.tipoDocumentoId === 0) {
      console.error('El campo tipoDocumentoId no puede ser 0');
      return;
    }

    if (entidadToSave.tipoContribuyenteId === 0) {
      console.error('El campo tipoContribuyenteId no puede ser 0');
      return;
    }

    if (this.entidadSeleccionada?.idEntidad) {
      this.entidadService.update(this.entidadSeleccionada.idEntidad, entidadToSave).subscribe(
        () => {
          this.loadEntidades();
          this.cerrarModal();
          this.notificationService.showSuccess('Entidad actualizada con éxito');
        },
        error => {
          console.error('Error al actualizar la entidad:', error);
          this.notificationService.showError('Error al actualizar la entidad');
        }
      );
    } else {
      this.entidadService.create(entidadToSave).subscribe(
        () => {
          this.loadEntidades();
          this.cerrarModal();
          this.notificationService.showSuccess('Entidad creada con éxito');
        },
        error => {
          console.error('Error al crear la entidad:', error);
          this.notificationService.showError('Error al crear la entidad');
        }
      );
    }
  }

  async editarEntidad(entidad: Entidad): Promise<void> {
    const confirmed = await this.notificationService.showConfirmation('¿Desea editar esta entidad?');
    if (confirmed) {
      this.entidadSeleccionada = entidad;
      this.abrirModal();
    }
  }

  async eliminarEntidad(entidad: Entidad): Promise<void> {
    const confirmed = await this.notificationService.showConfirmation('¿Desea eliminar esta entidad?');
    if (confirmed) {
      this.entidadService.delete(entidad.idEntidad).subscribe(
        () => {
          this.loadEntidades();
          this.notificationService.showSuccess('Entidad eliminada con éxito');
        },
        error => {
          console.error('Error al eliminar la entidad:', error);
          this.notificationService.showError('Error al eliminar la entidad');
        }
      );
    }
  }
}
