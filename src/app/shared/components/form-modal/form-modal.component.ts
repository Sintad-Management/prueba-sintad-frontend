import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Entidad} from '../../../core/models/entidad.model';
import {TipoDocumento} from '../../../core/models/tipoDocumento.model';
import {TipoContribuyente} from '../../../core/models/tipoContribuyente.entidad.model';

@Component({
  selector: 'app-form-modal',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './form-modal.component.html',
  standalone: true,
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent implements OnChanges {
  @Input() fields: { key: string; label: string; type: string }[] = [];
  @Input() entidad: any = {};
  @Output() formSubmit = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnChanges(): void {
    this.entidad = this.entidad || {};
    this.form = this.fb.group({});
    this.fields.forEach(field => {
      this.form.addControl(field.key, this.fb.control(this.entidad[field.key] || ''));
    });
  }

  onSubmit(): void {
    this.formSubmit.emit(this.form.value);
  }

  closeModal(): void {
    this.close.emit();
  }
}
