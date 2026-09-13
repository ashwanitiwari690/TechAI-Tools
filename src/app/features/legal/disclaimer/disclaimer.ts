import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-disclaimer',
  imports: [RouterLink, Breadcrumb],
  templateUrl: './disclaimer.html',
  styleUrl: './disclaimer.scss'
})
export class Disclaimer {
  readonly breadcrumb = [{ label: 'Home', link: ['/'] }, { label: 'Disclaimer' }];

  constructor() {
    inject(SeoService).update({
      title: 'Disclaimer',
      description: 'Important information about the accuracy and limitations of content, ratings and reviews on TechAI Tools.',
      canonicalPath: '/disclaimer'
    });
  }
}
