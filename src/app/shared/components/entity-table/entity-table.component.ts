import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-entity-table',
  imports: [
    NgForOf,
  ],
  templateUrl: './entity-table.component.html',
  standalone: true,
  styleUrl: './entity-table.component.css'
})
export class EntityTableComponent implements OnChanges {
  @Input() columns: { key: string; label: string }[] = [];
  @Input() data: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  paginatedData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;
  totalPagesArray: number[] = [];

  ngOnChanges(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginateData();
  }

  paginateData(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.data.slice(start, end);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.paginateData();
  }
}
