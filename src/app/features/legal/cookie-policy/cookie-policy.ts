import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { SeoService } from '../../../core/services/seo.service';
import { CookieConsentService } from '../../../core/services/cookie-consent.service';

@Component({
  selector: 'app-cookie-policy',
  imports: [RouterLink, Breadcrumb],
  templateUrl: './cookie-policy.html',
  styleUrl: './cookie-policy.scss'
})
export class CookiePolicy {
  protected readonly consent = inject(CookieConsentService);
  readonly breadcrumb = [{ label: 'Home', link: ['/'] }, { label: 'Cookie Policy' }];

  constructor() {
    inject(SeoService).update({
      title: 'Cookie Policy',
      description: 'How TechAI Tools uses cookies and browser local storage, and how to manage your preferences.',
      canonicalPath: '/cookie-policy'
    });
  }
}
