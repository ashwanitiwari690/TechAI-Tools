import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { SoftwareService } from '../../software.service';
import { SeoService } from '../../../../core/services/seo.service';
import { StructuredDataService } from '../../../../core/services/structured-data.service';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { Badge } from '../../../../shared/components/badge/badge';
import { Rating } from '../../../../shared/components/rating/rating';
import { Button } from '../../../../shared/components/button/button';
import { FavoriteButton } from '../../../../shared/components/favorite-button/favorite-button';
import { FaqAccordion } from '../../../../shared/components/faq-accordion/faq-accordion';
import { AdRectangle } from '../../../../shared/components/ad-rectangle/ad-rectangle';
import { AdInArticle } from '../../../../shared/components/ad-in-article/ad-in-article';
import { SoftwareCard } from '../../components/software-card/software-card';

@Component({
  selector: 'app-software-detail',
  imports: [Breadcrumb, Badge, Rating, Button, FavoriteButton, FaqAccordion, AdRectangle, AdInArticle, SoftwareCard],
  templateUrl: './software-detail.html',
  styleUrl: './software-detail.scss'
})
export class SoftwareDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly softwareService = inject(SoftwareService);
  private readonly seo = inject(SeoService);
  private readonly structuredData = inject(StructuredDataService);

  private readonly params = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  readonly item = computed(() => this.softwareService.getBySlug(this.params().get('slug') ?? ''));

  readonly related = computed(() => {
    const item = this.item();
    return item ? this.softwareService.getRelated(item) : [];
  });

  readonly breadcrumb = computed(() => {
    const item = this.item();
    return [{ label: 'Home', link: ['/'] }, { label: 'Software', link: ['/software'] }, { label: item?.name ?? '' }];
  });

  constructor() {
    effect(() => {
      const item = this.item();
      if (!item) {
        this.router.navigate(['/404']);
        return;
      }

      this.seo.update({
        title: `${item.name} — Overview, Features & Pricing`,
        description: item.shortDescription,
        canonicalPath: `/software/${item.slug}`,
        ogType: 'article'
      });

      this.structuredData.set([
        this.structuredData.breadcrumbSchema([
          { name: 'Home', url: 'https://www.techai-tools.example/' },
          { name: 'Software', url: 'https://www.techai-tools.example/software' },
          { name: item.name, url: `https://www.techai-tools.example/software/${item.slug}` }
        ]),
        this.structuredData.softwareApplicationSchema({
          name: item.name,
          description: item.shortDescription,
          category: item.category,
          ratingValue: item.rating,
          ratingCount: item.reviewCount,
          pricing: item.pricing
        }),
        this.structuredData.faqPageSchema(item.faq)
      ]);
    });
  }
}
