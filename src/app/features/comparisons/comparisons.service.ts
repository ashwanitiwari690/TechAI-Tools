import { Injectable } from '@angular/core';
import { Comparison } from '../../core/models/comparison.model';
import { COMPARISONS } from './data/comparisons.data';

@Injectable({ providedIn: 'root' })
export class ComparisonsService {
  getAll(): Comparison[] {
    return COMPARISONS;
  }

  getBySlug(slug: string): Comparison | undefined {
    return COMPARISONS.find((c) => c.slug === slug);
  }

  getOthers(comparison: Comparison, limit = 3): Comparison[] {
    return COMPARISONS.filter((c) => c.slug !== comparison.slug).slice(0, limit);
  }
}
