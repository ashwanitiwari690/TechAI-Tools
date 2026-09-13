import { Component, inject } from '@angular/core';
import { ComparisonsService } from '../../comparisons.service';
import { ComparisonCard } from '../../components/comparison-card/comparison-card';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { AdBanner } from '../../../../shared/components/ad-banner/ad-banner';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-comparisons-list',
  imports: [ComparisonCard, Breadcrumb, AdBanner],
  templateUrl: './comparisons-list.html',
  styleUrl: './comparisons-list.scss'
})
export class ComparisonsList {
  private readonly comparisonsService = inject(ComparisonsService);
  private readonly seo = inject(SeoService);

  readonly comparisons = this.comparisonsService.getAll();
  readonly breadcrumb = [{ label: 'Home', link: ['/'] }, { label: 'Comparisons' }];

  constructor() {
    this.seo.update({
      title: 'AI & Software Comparisons — Side-by-Side Tool Reviews',
      description: 'Detailed side-by-side comparisons of popular AI tools and developer tools, including features, pricing, pros, cons and a clear verdict.',
      canonicalPath: '/comparisons'
    });
  }
}
