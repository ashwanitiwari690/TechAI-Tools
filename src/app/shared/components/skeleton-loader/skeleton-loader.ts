import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  template: `<span class="skeleton" [style.width]="width()" [style.height]="height()" [style.borderRadius]="radius()"></span>`,
  styleUrl: './skeleton-loader.scss'
})
export class SkeletonLoader {
  readonly width = input<string>('100%');
  readonly height = input<string>('16px');
  readonly radius = input<string>('6px');
}
