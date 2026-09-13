import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AiToolsService } from '../../ai-tools.service';
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
import { AiToolCard } from '../../components/ai-tool-card/ai-tool-card';

function humanizeSlug(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

@Component({
  selector: 'app-ai-tool-detail',
  imports: [RouterLink, Breadcrumb, Badge, Rating, Button, FavoriteButton, FaqAccordion, AdRectangle, AdInArticle, AiToolCard],
  templateUrl: './ai-tool-detail.html',
  styleUrl: './ai-tool-detail.scss'
})
export class AiToolDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly aiTools = inject(AiToolsService);
  private readonly seo = inject(SeoService);
  private readonly structuredData = inject(StructuredDataService);

  private readonly slug = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  readonly tool = computed(() => this.aiTools.getBySlug(this.slug().get('slug') ?? ''));

  readonly related = computed(() => {
    const tool = this.tool();
    return tool ? this.aiTools.getRelated(tool) : [];
  });

  readonly breadcrumb = computed(() => {
    const tool = this.tool();
    return [{ label: 'Home', link: ['/'] }, { label: 'AI Tools', link: ['/ai-tools'] }, { label: tool?.name ?? '' }];
  });

  readonly alternativeCards = computed(() => {
    const tool = this.tool();
    if (!tool) return [];
    return tool.alternatives.map((name) => this.aiTools.findByName(name)).filter((t): t is NonNullable<typeof t> => !!t);
  });

  relatedTutorialTitle(slug: string): string {
    return humanizeSlug(slug);
  }

  constructor() {
    effect(() => {
      const tool = this.tool();
      if (!tool) {
        this.router.navigate(['/404']);
        return;
      }

      this.seo.update({
        title: `${tool.name} — Review, Features, Pricing & Alternatives`,
        description: tool.shortDescription,
        canonicalPath: `/ai-tools/${tool.slug}`,
        ogType: 'article'
      });

      this.structuredData.set([
        this.structuredData.breadcrumbSchema([
          { name: 'Home', url: 'https://www.techai-tools.example/' },
          { name: 'AI Tools', url: 'https://www.techai-tools.example/ai-tools' },
          { name: tool.name, url: `https://www.techai-tools.example/ai-tools/${tool.slug}` }
        ]),
        this.structuredData.softwareApplicationSchema({
          name: tool.name,
          description: tool.shortDescription,
          category: tool.category,
          ratingValue: tool.rating,
          ratingCount: tool.reviewCount,
          pricing: tool.pricing
        }),
        this.structuredData.faqPageSchema(tool.faq)
      ]);
    });
  }
}
