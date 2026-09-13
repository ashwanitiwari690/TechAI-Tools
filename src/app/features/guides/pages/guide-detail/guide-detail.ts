import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { GuidesService } from '../../guides.service';
import { SeoService } from '../../../../core/services/seo.service';
import { StructuredDataService } from '../../../../core/services/structured-data.service';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { Badge } from '../../../../shared/components/badge/badge';
import { FavoriteButton } from '../../../../shared/components/favorite-button/favorite-button';
import { FaqAccordion } from '../../../../shared/components/faq-accordion/faq-accordion';
import { AdInArticle } from '../../../../shared/components/ad-in-article/ad-in-article';
import { AdRectangle } from '../../../../shared/components/ad-rectangle/ad-rectangle';
import { GuideCard } from '../../components/guide-card/guide-card';

@Component({
  selector: 'app-guide-detail',
  imports: [Breadcrumb, Badge, FavoriteButton, FaqAccordion, AdInArticle, AdRectangle, GuideCard],
  templateUrl: './guide-detail.html',
  styleUrl: './guide-detail.scss'
})
export class GuideDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly guidesService = inject(GuidesService);
  private readonly seo = inject(SeoService);
  private readonly structuredData = inject(StructuredDataService);

  private readonly params = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  readonly guide = computed(() => this.guidesService.getBySlug(this.params().get('slug') ?? ''));
  readonly toc = computed(() => this.guide()?.sections.map((s) => s.heading) ?? []);
  readonly related = computed(() => {
    const guide = this.guide();
    return guide ? this.guidesService.getRelated(guide) : [];
  });

  readonly breadcrumb = computed(() => {
    const guide = this.guide();
    return [{ label: 'Home', link: ['/'] }, { label: 'Guides', link: ['/guides'] }, { label: guide?.title ?? '' }];
  });

  slugify(heading: string): string {
    return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  constructor() {
    effect(() => {
      const guide = this.guide();
      if (!guide) {
        this.router.navigate(['/404']);
        return;
      }

      this.seo.update({
        title: guide.title,
        description: guide.description,
        canonicalPath: `/guides/${guide.slug}`,
        ogType: 'article'
      });

      this.structuredData.set([
        this.structuredData.breadcrumbSchema([
          { name: 'Home', url: 'https://www.techai-tools.example/' },
          { name: 'Guides', url: 'https://www.techai-tools.example/guides' },
          { name: guide.title, url: `https://www.techai-tools.example/guides/${guide.slug}` }
        ]),
        this.structuredData.faqPageSchema(guide.faq)
      ]);
    });
  }
}
