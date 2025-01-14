import { Component } from '@angular/core';
import { EntityTableComponent } from '../../shared/components/entity-table/entity-table.component';
import { FormModalComponent } from '../../shared/components/form-modal/form-modal.component';
import { NgIf } from '@angular/common';

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
export class TipoDocumentoComponent {
  tiposDocumento = [
    { idTipoDocumento: 1, codigo: 'DOC1', nombre: 'Documento 1', descripcion: 'Descripción 1', estado: true },
    { idTipoDocumento: 2, codigo: 'DOC2', nombre: 'Documento 2', descripcion: 'Descripción 2', estado: false }
  ];
  isModalOpen = false;
  tipoDocumentoSeleccionado: any = null;
  columns = [
    { key: 'idTipoDocumento', label: 'ID' },
    { key: 'codigo', label: 'Código' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'estado', label: 'Estado' }
  ];
  fields = [
    { key: 'codigo', label: 'Código', type: 'text' },
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'descripcion', label: 'Descripción', type: 'text' },
    { key: 'estado', label: 'Estado', type: 'checkbox' }
  ];

  abrirModal(): void {
    this.isModalOpen = true;
  }

  cerrarModal(): void {
    this.isModalOpen = false;
    this.tipoDocumentoSeleccionado = null;
  }

  guardarTipoDocumento(tipoDocumento: any): void {
    if (this.tipoDocumentoSeleccionado) {
      const index = this.tiposDocumento.findIndex(td => td.idTipoDocumento === this.tipoDocumentoSeleccionado.idTipoDocumento);
      if (index !== -1) {
        this.tiposDocumento[index] = tipoDocumento;
      }
    } else {
      tipoDocumento.idTipoDocumento = this.tiposDocumento.length + 1;
      this.tiposDocumento.push(tipoDocumento);
    }
    this.cerrarModal();
  }

  editarTipoDocumento(tipoDocumento: any): void {
    this.tipoDocumentoSeleccionado = tipoDocumento;
    this.abrirModal();
  }

  eliminarTipoDocumento(tipoDocumento: any): void {
    this.tiposDocumento = this.tiposDocumento.filter(td => td.idTipoDocumento !== tipoDocumento.idTipoDocumento);
  }
}
