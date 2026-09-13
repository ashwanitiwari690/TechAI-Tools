import { Injectable, computed, signal } from '@angular/core';

export type FavoriteType = 'ai-tool' | 'software' | 'tutorial' | 'guide';

export interface FavoriteEntry {
  type: FavoriteType;
  slug: string;
  addedAt: string;
}

const STORAGE_KEY = 'techai-favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly entries = signal<FavoriteEntry[]>(this.readStored());
  readonly all = computed(() => this.entries());
  readonly count = computed(() => this.entries().length);

  isFavorite(type: FavoriteType, slug: string): boolean {
    return this.entries().some((entry) => entry.type === type && entry.slug === slug);
  }

  toggle(type: FavoriteType, slug: string): void {
    if (this.isFavorite(type, slug)) {
      this.remove(type, slug);
    } else {
      this.add(type, slug);
    }
  }

  add(type: FavoriteType, slug: string): void {
    if (this.isFavorite(type, slug)) {
      return;
    }
    const next = [...this.entries(), { type, slug, addedAt: new Date().toISOString() }];
    this.entries.set(next);
    this.persist(next);
  }

  remove(type: FavoriteType, slug: string): void {
    const next = this.entries().filter((entry) => !(entry.type === type && entry.slug === slug));
    this.entries.set(next);
    this.persist(next);
  }

  byType(type: FavoriteType): FavoriteEntry[] {
    return this.entries().filter((entry) => entry.type === type);
  }

  private persist(entries: FavoriteEntry[]): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }

  private readStored(): FavoriteEntry[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as FavoriteEntry[]) : [];
    } catch {
      return [];
    }
  }
}
