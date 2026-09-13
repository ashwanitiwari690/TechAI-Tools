import { Injectable, effect, signal } from '@angular/core';

export type ThemePreference = 'light' | 'dark' | 'system';
export type EffectiveTheme = 'light' | 'dark';

const STORAGE_KEY = 'techai-theme-preference';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly media = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  readonly preference = signal<ThemePreference>(this.readStoredPreference());
  readonly effectiveTheme = signal<EffectiveTheme>(this.computeEffectiveTheme(this.preference()));

  constructor() {
    this.media?.addEventListener('change', () => {
      if (this.preference() === 'system') {
        this.effectiveTheme.set(this.computeEffectiveTheme('system'));
      }
    });

    effect(() => {
      const theme = this.effectiveTheme();
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }
    });
  }

  setPreference(preference: ThemePreference): void {
    this.preference.set(preference);
    this.effectiveTheme.set(this.computeEffectiveTheme(preference));
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, preference);
    }
  }

  toggle(): void {
    this.setPreference(this.effectiveTheme() === 'dark' ? 'light' : 'dark');
  }

  private computeEffectiveTheme(preference: ThemePreference): EffectiveTheme {
    if (preference === 'system') {
      return this.media?.matches ? 'dark' : 'light';
    }
    return preference;
  }

  private readStoredPreference(): ThemePreference {
    if (typeof localStorage === 'undefined') {
      return 'system';
    }
    const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
  }
}
