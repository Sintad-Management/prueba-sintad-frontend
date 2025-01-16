import { Component, OnInit } from '@angular/core';
import { EntityTableComponent } from '../../shared/components/entity-table/entity-table.component';
import { FormModalComponent } from '../../shared/components/form-modal/form-modal.component';
import { NgIf } from '@angular/common';
import { TipoDocumento } from '../../core/models/tipoDocumento.model';
import { TipoDocumentoService } from '../../core/services/tipo-documento.service';
import { NotificationService } from '../../shared/service/notification.service';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-tipo-documento',
  imports: [
    EntityTableComponent,
    FormModalComponent,
    NgIf
  ],
  templateUrl: './tipo-documento.component.html',
  standalone: true,
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent implements OnInit {
  tiposDocumento: TipoDocumento[] = [];
  isModalOpen = false;
  tipoDocumentoSeleccionado: TipoDocumento | null = null;
  columns = [
    { key: 'codigo', label: 'Código' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'estado', label: 'Estado' }
  ];
  fields = [
    { key: 'codigo', label: 'Código', type: 'text', validations: [Validators.required, Validators.minLength(2)] },
    { key: 'nombre', label: 'Nombre', type: 'text', validations: [Validators.required, Validators.minLength(3)] },
    { key: 'descripcion', label: 'Descripción', type: 'text', validations: [Validators.maxLength(255)] },
    { key: 'estado', label: 'Estado', type: 'checkbox' }
  ];

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTiposDocumento();
  }

  loadTiposDocumento(): void {
    this.tipoDocumentoService.getAll().subscribe(data => {
      this.tiposDocumento = data;
    });
  }

  abrirModal(): void {
    this.isModalOpen = true;
  }

  cerrarModal(): void {
    this.isModalOpen = false;
    this.tipoDocumentoSeleccionado = null;
  }

  guardarTipoDocumento(tipoDocumento: TipoDocumento): void {
    if (this.tipoDocumentoSeleccionado) {
      this.tipoDocumentoService.update(this.tipoDocumentoSeleccionado.id, tipoDocumento).subscribe(() => {
        this.loadTiposDocumento();
        this.notificationService.showSuccess('Tipo de Documento actualizado con éxito');
      }, error => {
        console.error('Error al actualizar el Tipo de Documento:', error);
        this.notificationService.showError('Error al actualizar el Tipo de Documento');
      });
    } else {
      this.tipoDocumentoService.create(tipoDocumento).subscribe(() => {
        this.loadTiposDocumento();
        this.notificationService.showSuccess('Tipo de Documento creado con éxito');
      }, error => {
        console.error('Error al crear el Tipo de Documento:', error);
        this.notificationService.showError('Error al crear el Tipo de Documento');
      });
    }
    this.cerrarModal();
  }

  async editarTipoDocumento(tipoDocumento: TipoDocumento): Promise<void> {
    const confirmed = await this.notificationService.showConfirmation('¿Desea editar este Tipo de Documento?');
    if (confirmed) {
      this.tipoDocumentoSeleccionado = tipoDocumento;
      this.abrirModal();
    }
  }

  async eliminarTipoDocumento(tipoDocumento: TipoDocumento): Promise<void> {
    const confirmed = await this.notificationService.showConfirmation('¿Desea eliminar este Tipo de Documento?');
    if (confirmed) {
      this.tipoDocumentoService.delete(tipoDocumento.id).subscribe(() => {
        this.loadTiposDocumento();
        this.notificationService.showSuccess('Tipo de Documento eliminado con éxito');
      }, error => {
        console.error('Error al eliminar el Tipo de Documento:', error);
        this.notificationService.showError('Error al eliminar el Tipo de Documento');
      });
    }
  }
}
