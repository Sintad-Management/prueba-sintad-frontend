import { Component, OnInit } from '@angular/core';
import { EntityTableComponent } from '../../shared/components/entity-table/entity-table.component';
import { FormModalComponent } from '../../shared/components/form-modal/form-modal.component';
import { NgIf } from '@angular/common';
import {TipoContribuyente} from '../../core/models/tipoContribuyente.model';
import {TipoContribuyenteService} from '../../core/services/tipo-contribuyente.service';

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
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'estado', label: 'Estado' }
  ];
  fields = [
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'estado', label: 'Estado', type: 'checkbox' }
  ];

  constructor(private tipoContribuyenteService: TipoContribuyenteService) {}

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
      });
    } else {
      this.tipoContribuyenteService.create(tipoContribuyente).subscribe(() => {
        this.loadTiposContribuyente();
      });
    }
    this.cerrarModal();
  }

  editarTipoContribuyente(tipoContribuyente: TipoContribuyente): void {
    this.tipoContribuyenteSeleccionado = tipoContribuyente;
    this.abrirModal();
  }

  eliminarTipoContribuyente(tipoContribuyente: TipoContribuyente): void {
    this.tipoContribuyenteService.delete(tipoContribuyente.id).subscribe(() => {
      this.loadTiposContribuyente();
    });
  }
}
