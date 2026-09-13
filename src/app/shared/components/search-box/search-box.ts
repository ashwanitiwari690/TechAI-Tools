import { Component, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  imports: [ReactiveFormsModule],
  templateUrl: './search-box.html',
  styleUrl: './search-box.scss'
})
export class SearchBox {
  private readonly router = inject(Router);

  readonly placeholder = input<string>('Search tools, tutorials and guides...');
  readonly size = input<'md' | 'lg'>('md');

  readonly query = new FormControl<string>('', { nonNullable: true });

  submit(): void {
    const value = this.query.value.trim();
    if (!value) {
      return;
    }
    this.router.navigate(['/search'], { queryParams: { q: value } });
  }
}
