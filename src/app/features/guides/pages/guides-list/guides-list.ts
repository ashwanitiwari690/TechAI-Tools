import { Component, computed, inject, signal } from '@angular/core';
import { GuidesService } from '../../guides.service';
import { GuideCard } from '../../components/guide-card/guide-card';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { AdBanner } from '../../../../shared/components/ad-banner/ad-banner';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-guides-list',
  imports: [GuideCard, Breadcrumb, EmptyState, AdBanner],
  templateUrl: './guides-list.html',
  styleUrl: './guides-list.scss'
})
export class GuidesList {
  private readonly guidesService = inject(GuidesService);
  private readonly seo = inject(SeoService);

  readonly allGuides = this.guidesService.getAll();
  readonly categories = ['All', ...Array.from(new Set(this.allGuides.map((g) => g.category)))];

  readonly searchTerm = signal('');
  readonly activeCategory = signal('All');

  readonly filtered = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const category = this.activeCategory();
    return this.allGuides.filter((guide) => {
      const matchesCategory = category === 'All' || guide.category === category;
      const matchesSearch = !term || guide.title.toLowerCase().includes(term) || guide.description.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  });

  readonly breadcrumb = [{ label: 'Home', link: ['/'] }, { label: 'Guides' }];

  constructor() {
    this.seo.update({
      title: 'Guides — AI, SEO, Developer, Software & Productivity',
      description: 'In-depth guides covering AI tool selection, SEO fundamentals, developer project setup, software choices and productivity systems.',
      canonicalPath: '/guides'
    });
  }
}
