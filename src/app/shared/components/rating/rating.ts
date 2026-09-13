import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.html',
  styleUrl: './rating.scss'
})
export class Rating {
  readonly value = input<number>(0);
  readonly reviewCount = input<number | null>(null);
  readonly showValue = input(true);

  readonly stars = computed(() => {
    const rounded = Math.round(this.value() * 2) / 2;
    return Array.from({ length: 5 }, (_, i) => {
      const starIndex = i + 1;
      if (rounded >= starIndex) return 'full';
      if (rounded + 0.5 === starIndex) return 'half';
      return 'empty';
    });
  });
}
