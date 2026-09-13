import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ComparisonsService } from '../../comparisons.service';
import { SeoService } from '../../../../core/services/seo.service';
import { StructuredDataService } from '../../../../core/services/structured-data.service';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { Rating } from '../../../../shared/components/rating/rating';
import { FaqAccordion } from '../../../../shared/components/faq-accordion/faq-accordion';
import { AdInArticle } from '../../../../shared/components/ad-in-article/ad-in-article';
import { AdRectangle } from '../../../../shared/components/ad-rectangle/ad-rectangle';
import { ComparisonCard } from '../../components/comparison-card/comparison-card';

@Component({
  selector: 'app-comparison-detail',
  imports: [RouterLink, Breadcrumb, Rating, FaqAccordion, AdInArticle, AdRectangle, ComparisonCard],
  templateUrl: './comparison-detail.html',
  styleUrl: './comparison-detail.scss'
})
export class ComparisonDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly comparisonsService = inject(ComparisonsService);
  private readonly seo = inject(SeoService);
  private readonly structuredData = inject(StructuredDataService);

  private readonly params = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  readonly comparison = computed(() => this.comparisonsService.getBySlug(this.params().get('slug') ?? ''));

  readonly others = computed(() => {
    const comparison = this.comparison();
    return comparison ? this.comparisonsService.getOthers(comparison) : [];
  });

  readonly breadcrumb = computed(() => {
    const comparison = this.comparison();
    return [{ label: 'Home', link: ['/'] }, { label: 'Comparisons', link: ['/comparisons'] }, { label: comparison?.title ?? '' }];
  });

  constructor() {
    effect(() => {
      const comparison = this.comparison();
      if (!comparison) {
        this.router.navigate(['/404']);
        return;
      }

      this.seo.update({
        title: comparison.title,
        description: comparison.description,
        canonicalPath: `/comparisons/${comparison.slug}`,
        ogType: 'article'
      });

      this.structuredData.set([
        this.structuredData.breadcrumbSchema([
          { name: 'Home', url: 'https://www.techai-tools.example/' },
          { name: 'Comparisons', url: 'https://www.techai-tools.example/comparisons' },
          { name: comparison.title, url: `https://www.techai-tools.example/comparisons/${comparison.slug}` }
        ]),
        this.structuredData.faqPageSchema(comparison.faq)
      ]);
    });
  }
}
