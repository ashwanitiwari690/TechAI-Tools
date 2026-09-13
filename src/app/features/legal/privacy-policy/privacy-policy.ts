import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink, Breadcrumb],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss'
})
export class PrivacyPolicy {
  readonly breadcrumb = [{ label: 'Home', link: ['/'] }, { label: 'Privacy Policy' }];
  readonly lastUpdated = '2026-03-01';

  constructor() {
    inject(SeoService).update({
      title: 'Privacy Policy',
      description: 'How TechAI Tools handles data such as theme preference, favorites and cookie consent, stored locally in your browser.',
      canonicalPath: '/privacy-policy'
    });
  }
}
