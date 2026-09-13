import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TutorialsService } from '../../tutorials.service';
import { SeoService } from '../../../../core/services/seo.service';
import { StructuredDataService } from '../../../../core/services/structured-data.service';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { Badge } from '../../../../shared/components/badge/badge';
import { FavoriteButton } from '../../../../shared/components/favorite-button/favorite-button';
import { FaqAccordion } from '../../../../shared/components/faq-accordion/faq-accordion';
import { CopyButton } from '../../../../shared/components/copy-button/copy-button';
import { AdInArticle } from '../../../../shared/components/ad-in-article/ad-in-article';
import { AdRectangle } from '../../../../shared/components/ad-rectangle/ad-rectangle';
import { TutorialCard } from '../../components/tutorial-card/tutorial-card';

@Component({
  selector: 'app-tutorial-detail',
  imports: [RouterLink, Breadcrumb, Badge, FavoriteButton, FaqAccordion, CopyButton, AdInArticle, AdRectangle, TutorialCard],
  templateUrl: './tutorial-detail.html',
  styleUrl: './tutorial-detail.scss'
})
export class TutorialDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly tutorialsService = inject(TutorialsService);
  private readonly seo = inject(SeoService);
  private readonly structuredData = inject(StructuredDataService);

  private readonly params = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  readonly tutorial = computed(() => this.tutorialsService.getBySlug(this.params().get('slug') ?? ''));

  readonly toc = computed(() => this.tutorial()?.sections.map((s) => s.heading) ?? []);

  readonly related = computed(() => {
    const tutorial = this.tutorial();
    return tutorial ? this.tutorialsService.getRelated(tutorial) : [];
  });

  readonly adjacent = computed(() => {
    const tutorial = this.tutorial();
    return tutorial ? this.tutorialsService.getAdjacent(tutorial) : { previous: null, next: null };
  });

  readonly breadcrumb = computed(() => {
    const tutorial = this.tutorial();
    return [{ label: 'Home', link: ['/'] }, { label: 'Tutorials', link: ['/tutorials'] }, { label: tutorial?.title ?? '' }];
  });

  slugify(heading: string): string {
    return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  constructor() {
    effect(() => {
      const tutorial = this.tutorial();
      if (!tutorial) {
        this.router.navigate(['/404']);
        return;
      }

      this.seo.update({
        title: tutorial.title,
        description: tutorial.description,
        canonicalPath: `/tutorials/${tutorial.slug}`,
        ogType: 'article'
      });

      this.structuredData.set([
        this.structuredData.breadcrumbSchema([
          { name: 'Home', url: 'https://www.techai-tools.example/' },
          { name: 'Tutorials', url: 'https://www.techai-tools.example/tutorials' },
          { name: tutorial.title, url: `https://www.techai-tools.example/tutorials/${tutorial.slug}` }
        ]),
        this.structuredData.articleSchema({
          headline: tutorial.title,
          description: tutorial.description,
          url: `https://www.techai-tools.example/tutorials/${tutorial.slug}`,
          imageUrl: 'https://www.techai-tools.example/og-default.png',
          authorName: tutorial.author.name,
          datePublished: tutorial.publishedDate,
          dateModified: tutorial.updatedDate
        }),
        this.structuredData.faqPageSchema(tutorial.faq)
      ]);
    });
  }
}
