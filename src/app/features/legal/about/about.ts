import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-about',
  imports: [RouterLink, Breadcrumb],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  readonly breadcrumb = [{ label: 'Home', link: ['/'] }, { label: 'About' }];

  constructor() {
    inject(SeoService).update({
      title: 'About',
      description: 'Learn about TechAI Tools — a curated platform for AI tools, developer utilities, software and practical tutorials.',
      canonicalPath: '/about'
    });
  }
}
