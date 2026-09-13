import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-terms',
  imports: [RouterLink, Breadcrumb],
  templateUrl: './terms.html',
  styleUrl: './terms.scss'
})
export class Terms {
  readonly breadcrumb = [{ label: 'Home', link: ['/'] }, { label: 'Terms & Conditions' }];
  readonly lastUpdated = '2026-03-01';

  constructor() {
    inject(SeoService).update({
      title: 'Terms & Conditions',
      description: 'Terms and conditions for using the TechAI Tools website and its free browser-based developer tools.',
      canonicalPath: '/terms'
    });
  }
}
