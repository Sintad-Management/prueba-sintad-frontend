import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-entity-table',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './entity-table.component.html',
  standalone: true,
  styleUrl: './entity-table.component.css'
})
export class EntityTableComponent {
  @Input() columns: { key: string; label: string }[] = [];
  @Input() data: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
}
