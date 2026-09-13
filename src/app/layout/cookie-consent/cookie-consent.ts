import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieConsentService } from '../../core/services/cookie-consent.service';
import { Modal } from '../../shared/components/modal/modal';

@Component({
  selector: 'app-cookie-consent',
  imports: [RouterLink, Modal],
  templateUrl: './cookie-consent.html',
  styleUrl: './cookie-consent.scss'
})
export class CookieConsent {
  protected readonly consent = inject(CookieConsentService);

  readonly preferencesOpen = signal(false);
  readonly draftAnalytics = signal(false);
  readonly draftAdvertising = signal(false);

  openPreferences(): void {
    const current = this.consent.preferences();
    this.draftAnalytics.set(current.analytics);
    this.draftAdvertising.set(current.advertising);
    this.preferencesOpen.set(true);
  }

  closePreferences(): void {
    this.preferencesOpen.set(false);
  }

  savePreferences(): void {
    this.consent.savePreferences({ analytics: this.draftAnalytics(), advertising: this.draftAdvertising() });
    this.preferencesOpen.set(false);
  }
}
