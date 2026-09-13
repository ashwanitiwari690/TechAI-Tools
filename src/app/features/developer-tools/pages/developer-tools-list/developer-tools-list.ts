import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { Card } from '../../../../shared/components/card/card';
import { Badge } from '../../../../shared/components/badge/badge';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { AdBanner } from '../../../../shared/components/ad-banner/ad-banner';

@Component({
  selector: 'app-developer-tools-list',
  imports: [RouterLink, Breadcrumb, Card, Badge, EmptyState, AdBanner],
  templateUrl: './developer-tools-list.html',
  styleUrl: './developer-tools-list.scss'
})
export class DeveloperToolsList {
  private readonly directory = inject(DeveloperToolsDirectory);

  readonly searchTerm = signal('');
  readonly tools = this.directory.getAll();

  readonly categories = ['All', ...Array.from(new Set(this.tools.map((t) => t.category)))];
  readonly activeCategory = signal('All');

  readonly filtered = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const category = this.activeCategory();
    return this.tools.filter((tool) => {
      const matchesCategory = category === 'All' || tool.category === category;
      const matchesSearch = !term || tool.name.toLowerCase().includes(term) || tool.shortDescription.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  });

  readonly breadcrumb = [{ label: 'Home', link: ['/'] }, { label: 'Developer Tools' }];
}
