import { Component, OnInit } from '@angular/core';
import { EntityTableComponent } from '../../shared/components/entity-table/entity-table.component';
import { FormModalComponent } from '../../shared/components/form-modal/form-modal.component';
import { NgIf } from '@angular/common';
import {TipoDocumento} from '../../core/models/tipoDocumento.model';
import {TipoDocumentoService} from '../../core/services/tipo-documento.service';

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
    { key: 'id', label: 'ID' },
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

  constructor(private tipoDocumentoService: TipoDocumentoService) {}

  ngOnInit(): void {
    this.loadTiposDocumento();
  }

  loadTiposDocumento(): void {
    this.tipoDocumentoService.getAll().subscribe(data => {
      console.log('Datos obtenidos del backend:', data);

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
      });
    } else {
      this.tipoDocumentoService.create(tipoDocumento).subscribe(() => {
        this.loadTiposDocumento();
      });
    }
    this.cerrarModal();
  }

  editarTipoDocumento(tipoDocumento: TipoDocumento): void {
    this.tipoDocumentoSeleccionado = tipoDocumento;
    this.abrirModal();
  }

  eliminarTipoDocumento(tipoDocumento: TipoDocumento): void {
    this.tipoDocumentoService.delete(tipoDocumento.id).subscribe(() => {
      this.loadTiposDocumento();
    });
  }
}
