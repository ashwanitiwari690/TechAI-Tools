import { Injectable, computed, signal } from '@angular/core';

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
}

export type ConsentStatus = 'unset' | 'accepted' | 'rejected' | 'custom';

interface StoredConsent {
  status: ConsentStatus;
  preferences: CookiePreferences;
}

const STORAGE_KEY = 'techai-cookie-consent';

const DEFAULT_PREFERENCES: CookiePreferences = { necessary: true, analytics: false, advertising: false };

/**
 * Frontend-only cookie consent state. This stores a user's choice in
 * localStorage and gates optional (non-essential) behavior in the app.
 * It is NOT a certified legal-compliance solution — before going live,
 * review requirements such as GDPR (EU/UK), ePrivacy, and CCPA/CPRA for
 * the regions you target, and consider a dedicated consent management
 * platform if you need audit trails or geo-specific banners.
 */
@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly stored = signal<StoredConsent>(this.readStored());

  readonly status = computed(() => this.stored().status);
  readonly preferences = computed(() => this.stored().preferences);
  readonly bannerVisible = computed(() => this.stored().status === 'unset');

  acceptAll(): void {
    this.persist({ status: 'accepted', preferences: { necessary: true, analytics: true, advertising: true } });
  }

  rejectNonEssential(): void {
    this.persist({ status: 'rejected', preferences: { ...DEFAULT_PREFERENCES } });
  }

  savePreferences(preferences: Omit<CookiePreferences, 'necessary'>): void {
    this.persist({ status: 'custom', preferences: { necessary: true, ...preferences } });
  }

  resetChoice(): void {
    this.persist({ status: 'unset', preferences: { ...DEFAULT_PREFERENCES } });
  }

  private persist(consent: StoredConsent): void {
    this.stored.set(consent);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    }
  }

  private readStored(): StoredConsent {
    if (typeof localStorage === 'undefined') {
      return { status: 'unset', preferences: { ...DEFAULT_PREFERENCES } };
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { status: 'unset', preferences: { ...DEFAULT_PREFERENCES } };
      }
      return JSON.parse(raw) as StoredConsent;
    } catch {
      return { status: 'unset', preferences: { ...DEFAULT_PREFERENCES } };
    }
  }
}
