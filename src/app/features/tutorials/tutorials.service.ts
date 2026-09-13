import { Injectable } from '@angular/core';
import { Tutorial } from '../../core/models/tutorial.model';
import { TUTORIALS } from './data/tutorials.data';

@Injectable({ providedIn: 'root' })
export class TutorialsService {
  getAll(): Tutorial[] {
    return TUTORIALS;
  }

  getFeatured(limit = 6): Tutorial[] {
    return TUTORIALS.filter((t) => t.featured).slice(0, limit);
  }

  getLatest(limit = 3): Tutorial[] {
    return [...TUTORIALS].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()).slice(0, limit);
  }

  getBySlug(slug: string): Tutorial | undefined {
    return TUTORIALS.find((t) => t.slug === slug);
  }

  getByCategory(category: string): Tutorial[] {
    return TUTORIALS.filter((t) => t.category === category);
  }

  getRelated(tutorial: Tutorial, limit = 3): Tutorial[] {
    const bySlug = tutorial.relatedTutorialSlugs.map((slug) => this.getBySlug(slug)).filter((t): t is Tutorial => !!t);
    if (bySlug.length >= limit) {
      return bySlug.slice(0, limit);
    }
    const fallback = TUTORIALS.filter(
      (t) => t.slug !== tutorial.slug && t.category === tutorial.category && !bySlug.some((b) => b.slug === t.slug)
    );
    return [...bySlug, ...fallback].slice(0, limit);
  }

  getAdjacent(tutorial: Tutorial): { previous: Tutorial | null; next: Tutorial | null } {
    const index = TUTORIALS.findIndex((t) => t.slug === tutorial.slug);
    return {
      previous: index > 0 ? TUTORIALS[index - 1] : null,
      next: index >= 0 && index < TUTORIALS.length - 1 ? TUTORIALS[index + 1] : null
    };
  }
}
