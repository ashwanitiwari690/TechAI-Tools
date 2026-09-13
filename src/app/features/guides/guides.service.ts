import { Injectable } from '@angular/core';
import { Guide } from '../../core/models/guide.model';
import { GUIDES } from './data/guides.data';

@Injectable({ providedIn: 'root' })
export class GuidesService {
  getAll(): Guide[] {
    return GUIDES;
  }

  getBySlug(slug: string): Guide | undefined {
    return GUIDES.find((g) => g.slug === slug);
  }

  getRelated(guide: Guide, limit = 3): Guide[] {
    const bySlug = guide.relatedGuideSlugs.map((slug) => this.getBySlug(slug)).filter((g): g is Guide => !!g);
    if (bySlug.length >= limit) {
      return bySlug.slice(0, limit);
    }
    const fallback = GUIDES.filter((g) => g.slug !== guide.slug && g.category === guide.category && !bySlug.some((b) => b.slug === g.slug));
    return [...bySlug, ...fallback].slice(0, limit);
  }
}
