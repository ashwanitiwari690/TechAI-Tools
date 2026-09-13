import { Component, computed, inject, signal } from '@angular/core';
import { SoftwareService } from '../../software.service';
import { SoftwareCard } from '../../components/software-card/software-card';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { AdBanner } from '../../../../shared/components/ad-banner/ad-banner';
import { SeoService } from '../../../../core/services/seo.service';

const PAGE_SIZE = 9;

@Component({
  selector: 'app-software-list',
  imports: [SoftwareCard, Breadcrumb, EmptyState, Pagination, AdBanner],
  templateUrl: './software-list.html',
  styleUrl: './software-list.scss'
})
export class SoftwareList {
  private readonly softwareService = inject(SoftwareService);
  private readonly seo = inject(SeoService);

  readonly allItems = this.softwareService.getAll();
  readonly categories = ['All', ...Array.from(new Set(this.allItems.map((i) => i.category)))];

  readonly searchTerm = signal('');
  readonly activeCategory = signal('All');
  readonly page = signal(1);

  readonly filtered = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const category = this.activeCategory();
    return this.allItems.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesSearch = !term || item.name.toLowerCase().includes(term) || item.shortDescription.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  });

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)));

  readonly pagedItems = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  readonly breadcrumb = [{ label: 'Home', link: ['/'] }, { label: 'Software' }];

  constructor() {
    this.seo.update({
      title: 'Software Directory — Developer, Design, Business & Security Tools',
      description: 'Browse a curated directory of software across developer tools, design, productivity, business, security and more.',
      canonicalPath: '/software'
    });
  }

  updateSearch(value: string): void {
    this.searchTerm.set(value);
    this.page.set(1);
  }

  updateCategory(value: string): void {
    this.activeCategory.set(value);
    this.page.set(1);
  }
}
