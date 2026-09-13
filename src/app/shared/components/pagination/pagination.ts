import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss'
})
export class Pagination {
  readonly currentPage = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly pageChange = output<number>();

  readonly pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  goTo(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) {
      return;
    }
    this.pageChange.emit(page);
  }
}
