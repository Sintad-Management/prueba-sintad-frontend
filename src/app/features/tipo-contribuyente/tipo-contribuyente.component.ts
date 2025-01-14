import { Component } from '@angular/core';
import { EntityTableComponent } from '../../shared/components/entity-table/entity-table.component';
import { FormModalComponent } from '../../shared/components/form-modal/form-modal.component';
import { NgIf } from '@angular/common';

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
export class TipoContribuyenteComponent {
  tiposContribuyente = [
    { idTipoContribuyente: 1, nombre: 'Contribuyente 1', estado: true },
    { idTipoContribuyente: 2, nombre: 'Contribuyente 2', estado: false }
  ];
  isModalOpen = false;
  tipoContribuyenteSeleccionado: any = null;
  columns = [
    { key: 'idTipoContribuyente', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'estado', label: 'Estado' }
  ];
  fields = [
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'estado', label: 'Estado', type: 'checkbox' }
  ];

  abrirModal(): void {
    this.isModalOpen = true;
  }

  cerrarModal(): void {
    this.isModalOpen = false;
    this.tipoContribuyenteSeleccionado = null;
  }

  guardarTipoContribuyente(tipoContribuyente: any): void {
    if (this.tipoContribuyenteSeleccionado) {
      const index = this.tiposContribuyente.findIndex(tc => tc.idTipoContribuyente === this.tipoContribuyenteSeleccionado.idTipoContribuyente);
      if (index !== -1) {
        this.tiposContribuyente[index] = tipoContribuyente;
      }
    } else {
      tipoContribuyente.idTipoContribuyente = this.tiposContribuyente.length + 1;
      this.tiposContribuyente.push(tipoContribuyente);
    }
    this.cerrarModal();
  }

  editarTipoContribuyente(tipoContribuyente: any): void {
    this.tipoContribuyenteSeleccionado = tipoContribuyente;
    this.abrirModal();
  }

  eliminarTipoContribuyente(tipoContribuyente: any): void {
    this.tiposContribuyente = this.tiposContribuyente.filter(tc => tc.idTipoContribuyente !== tipoContribuyente.idTipoContribuyente);
  }
}
