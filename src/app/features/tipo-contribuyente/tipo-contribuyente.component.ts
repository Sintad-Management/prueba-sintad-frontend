import { Component, OnInit } from '@angular/core';
import { EntityTableComponent } from '../../shared/components/entity-table/entity-table.component';
import { FormModalComponent } from '../../shared/components/form-modal/form-modal.component';
import { NgIf } from '@angular/common';
import { TipoContribuyente } from '../../core/models/tipoContribuyente.model';
import { TipoContribuyenteService } from '../../core/services/tipo-contribuyente.service';
import { NotificationService } from '../../shared/service/notification.service';

@Component({
  selector: 'app-tipo-contribuyente',
  imports: [
    EntityTableComponent,
    FormModalComponent,
    NgIf
  ],
  templateUrl: './tipo-contribuyente.component.html',
  standalone: true,
  styleUrls: ['./tipo-contribuyente.component.css']
})
export class TipoContribuyenteComponent implements OnInit {
  tiposContribuyente: TipoContribuyente[] = [];
  isModalOpen = false;
  tipoContribuyenteSeleccionado: TipoContribuyente | null = null;
  columns = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'estado', label: 'Estado' }
  ];
  fields = [
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'estado', label: 'Estado', type: 'checkbox' }
  ];

  constructor(
    private tipoContribuyenteService: TipoContribuyenteService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTiposContribuyente();
  }

  loadTiposContribuyente(): void {
    this.tipoContribuyenteService.getAll().subscribe(data => {
      this.tiposContribuyente = data;
    });
  }

  abrirModal(): void {
    this.isModalOpen = true;
  }

  cerrarModal(): void {
    this.isModalOpen = false;
    this.tipoContribuyenteSeleccionado = null;
  }

  guardarTipoContribuyente(tipoContribuyente: TipoContribuyente): void {
    if (this.tipoContribuyenteSeleccionado) {
      this.tipoContribuyenteService.update(this.tipoContribuyenteSeleccionado.id, tipoContribuyente).subscribe(() => {
        this.loadTiposContribuyente();
        this.notificationService.showSuccess('Tipo de Contribuyente actualizado con éxito');
      }, error => {
        console.error('Error al actualizar el Tipo de Contribuyente:', error);
        this.notificationService.showError('Error al actualizar el Tipo de Contribuyente');
      });
    } else {
      this.tipoContribuyenteService.create(tipoContribuyente).subscribe(() => {
        this.loadTiposContribuyente();
        this.notificationService.showSuccess('Tipo de Contribuyente creado con éxito');
      }, error => {
        console.error('Error al crear el Tipo de Contribuyente:', error);
        this.notificationService.showError('Error al crear el Tipo de Contribuyente');
      });
    }
    this.cerrarModal();
  }

  async editarTipoContribuyente(tipoContribuyente: TipoContribuyente): Promise<void> {
    const confirmed = await this.notificationService.showConfirmation('¿Desea editar este Tipo de Contribuyente?');
    if (confirmed) {
      this.tipoContribuyenteSeleccionado = tipoContribuyente;
      this.abrirModal();
    }
  }

  async eliminarTipoContribuyente(tipoContribuyente: TipoContribuyente): Promise<void> {
    const confirmed = await this.notificationService.showConfirmation('¿Desea eliminar este Tipo de Contribuyente?');
    if (confirmed) {
      this.tipoContribuyenteService.delete(tipoContribuyente.id).subscribe(() => {
        this.loadTiposContribuyente();
        this.notificationService.showSuccess('Tipo de Contribuyente eliminado con éxito');
      }, error => {
        console.error('Error al eliminar el Tipo de Contribuyente:', error);
        this.notificationService.showError('Error al eliminar el Tipo de Contribuyente');
      });
    }
  }
}
