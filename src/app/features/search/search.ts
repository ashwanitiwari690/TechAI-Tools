import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchResultItem, SearchService } from './search.service';
import { SearchBox } from '../../shared/components/search-box/search-box';
import { EmptyState } from '../../shared/components/empty-state/empty-state';
import { SeoService } from '../../core/services/seo.service';

interface ResultGroup {
  label: string;
  items: SearchResultItem[];
}

@Component({
  selector: 'app-search',
  imports: [RouterLink, SearchBox, EmptyState],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {
  private readonly route = inject(ActivatedRoute);
  private readonly searchService = inject(SearchService);
  private readonly seo = inject(SeoService);

  private readonly queryParams = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });

  readonly query = computed(() => this.queryParams().get('q') ?? '');
  readonly results = computed(() => this.searchService.search(this.query()));

  readonly groups = computed<ResultGroup[]>(() => {
    const results = this.results();
    return [
      { label: 'AI Tools', items: results.aiTools },
      { label: 'Developer Tools', items: results.developerTools },
      { label: 'Software', items: results.software },
      { label: 'Tutorials', items: results.tutorials },
      { label: 'Guides', items: results.guides },
      { label: 'Comparisons', items: results.comparisons }
    ].filter((group) => group.items.length > 0);
  });

  constructor() {
    this.seo.update({
      title: 'Search',
      description: 'Search across AI tools, developer tools, software, tutorials, guides and comparisons.',
      canonicalPath: '/search',
      noIndex: true
    });
  }
}
