import { Component } from '@angular/core';
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

}
