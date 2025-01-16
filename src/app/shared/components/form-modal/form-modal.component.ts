import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';

@Component({
  selector: 'app-form-modal',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    NgSwitchCase,
    NgSwitch
  ],
  templateUrl: './form-modal.component.html',
  standalone: true,
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent implements OnChanges {
  @Input() fields: { key: string; label: string; type: string, validations?: any[] }[] = [];
  @Input() entidad: any = {};
  @Input() tiposDocumento: any[] = [];
  @Input() tiposContribuyente: any[] = [];
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
      const value = field.key === 'estado' ? !!this.entidad[field.key] : this.entidad[field.key] || '';
      const validators = field.validations || [];
      this.form.addControl(field.key, this.fb.control(value, validators));
    });
  }

  onSubmit(): void {
    this.formSubmit.emit(this.form.value);
  }

  closeModal(): void {
    this.close.emit();
  }
}
