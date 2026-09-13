import { Injectable } from '@angular/core';
import { SoftwareItem } from '../../core/models/software.model';
import { SOFTWARE_ITEMS } from './data/software.data';

@Injectable({ providedIn: 'root' })
export class SoftwareService {
  getAll(): SoftwareItem[] {
    return SOFTWARE_ITEMS;
  }

  getFeatured(limit = 6): SoftwareItem[] {
    return SOFTWARE_ITEMS.filter((item) => item.featured).slice(0, limit);
  }

  getBySlug(slug: string): SoftwareItem | undefined {
    return SOFTWARE_ITEMS.find((item) => item.slug === slug);
  }

  getRelated(item: SoftwareItem, limit = 3): SoftwareItem[] {
    return SOFTWARE_ITEMS.filter((s) => s.slug !== item.slug && s.category === item.category).slice(0, limit);
  }
}
