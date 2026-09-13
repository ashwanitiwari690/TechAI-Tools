import { Component, computed, inject, signal } from '@angular/core';
import { AiToolsService } from '../../ai-tools.service';
import { AiToolCard } from '../../components/ai-tool-card/ai-tool-card';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { AdBanner } from '../../../../shared/components/ad-banner/ad-banner';
import { PricingType } from '../../../../core/models/common.model';

const PAGE_SIZE = 9;

@Component({
  selector: 'app-ai-tools-list',
  imports: [AiToolCard, Breadcrumb, EmptyState, Pagination, AdBanner],
  templateUrl: './ai-tools-list.html',
  styleUrl: './ai-tools-list.scss'
})
export class AiToolsList {
  private readonly aiTools = inject(AiToolsService);

  readonly allTools = this.aiTools.getAll();
  readonly categories = ['All', ...Array.from(new Set(this.allTools.map((t) => t.category)))];
  readonly pricingOptions: ('All' | PricingType)[] = ['All', 'Free', 'Freemium', 'Paid'];
  readonly sortOptions = [
    { value: 'featured', label: 'Featured first' },
    { value: 'rating', label: 'Highest rated' },
    { value: 'name', label: 'Name (A-Z)' }
  ];

  readonly searchTerm = signal('');
  readonly activeCategory = signal('All');
  readonly activePricing = signal<'All' | PricingType>('All');
  readonly sortBy = signal('featured');
  readonly page = signal(1);

  readonly filteredAndSorted = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const category = this.activeCategory();
    const pricing = this.activePricing();
    const sort = this.sortBy();

    let result = this.allTools.filter((tool) => {
      const matchesCategory = category === 'All' || tool.category === category;
      const matchesPricing = pricing === 'All' || tool.pricing === pricing;
      const matchesSearch =
        !term ||
        tool.name.toLowerCase().includes(term) ||
        tool.shortDescription.toLowerCase().includes(term) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(term));
      return matchesCategory && matchesPricing && matchesSearch;
    });

    result = [...result].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return Number(b.featured) - Number(a.featured) || b.rating - a.rating;
    });

    return result;
  });

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filteredAndSorted().length / PAGE_SIZE)));

  readonly pagedTools = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.filteredAndSorted().slice(start, start + PAGE_SIZE);
  });

  readonly breadcrumb = [{ label: 'Home', link: ['/'] }, { label: 'AI Tools' }];

  updateSearch(value: string): void {
    this.searchTerm.set(value);
    this.page.set(1);
  }

  updateCategory(value: string): void {
    this.activeCategory.set(value);
    this.page.set(1);
  }

  updatePricing(value: 'All' | PricingType): void {
    this.activePricing.set(value);
    this.page.set(1);
  }

  updateSort(value: string): void {
    this.sortBy.set(value);
    this.page.set(1);
  }
}
