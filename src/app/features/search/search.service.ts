import { Injectable, inject } from '@angular/core';
import { AiToolsService } from '../ai-tools/ai-tools.service';
import { DeveloperToolsDirectory } from '../developer-tools/services/developer-tools.service';
import { SoftwareService } from '../software/software.service';
import { TutorialsService } from '../tutorials/tutorials.service';
import { GuidesService } from '../guides/guides.service';
import { ComparisonsService } from '../comparisons/comparisons.service';

export interface SearchResultItem {
  title: string;
  description: string;
  routerLink: string[];
}

export interface SearchResults {
  aiTools: SearchResultItem[];
  developerTools: SearchResultItem[];
  software: SearchResultItem[];
  tutorials: SearchResultItem[];
  guides: SearchResultItem[];
  comparisons: SearchResultItem[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly aiTools = inject(AiToolsService);
  private readonly developerTools = inject(DeveloperToolsDirectory);
  private readonly software = inject(SoftwareService);
  private readonly tutorials = inject(TutorialsService);
  private readonly guides = inject(GuidesService);
  private readonly comparisons = inject(ComparisonsService);

  search(rawQuery: string): SearchResults {
    const query = rawQuery.trim().toLowerCase();

    if (!query) {
      return { aiTools: [], developerTools: [], software: [], tutorials: [], guides: [], comparisons: [], totalCount: 0 };
    }

    const matches = (...values: string[]) => values.some((v) => v.toLowerCase().includes(query));

    const aiTools = this.aiTools
      .getAll()
      .filter((t) => matches(t.name, t.shortDescription, t.category, ...t.tags))
      .map((t) => ({ title: t.name, description: t.shortDescription, routerLink: ['/ai-tools', t.slug] }));

    const developerTools = this.developerTools
      .getAll()
      .filter((t) => matches(t.name, t.shortDescription, t.category))
      .map((t) => ({ title: t.name, description: t.shortDescription, routerLink: ['/developer-tools', t.slug] }));

    const software = this.software
      .getAll()
      .filter((s) => matches(s.name, s.shortDescription, s.category))
      .map((s) => ({ title: s.name, description: s.shortDescription, routerLink: ['/software', s.slug] }));

    const tutorials = this.tutorials
      .getAll()
      .filter((t) => matches(t.title, t.description, t.category, ...t.tags))
      .map((t) => ({ title: t.title, description: t.description, routerLink: ['/tutorials', t.slug] }));

    const guides = this.guides
      .getAll()
      .filter((g) => matches(g.title, g.description, g.category))
      .map((g) => ({ title: g.title, description: g.description, routerLink: ['/guides', g.slug] }));

    const comparisons = this.comparisons
      .getAll()
      .filter((c) => matches(c.title, c.description, c.itemA.name, c.itemB.name))
      .map((c) => ({ title: c.title, description: c.description, routerLink: ['/comparisons', c.slug] }));

    return {
      aiTools,
      developerTools,
      software,
      tutorials,
      guides,
      comparisons,
      totalCount: aiTools.length + developerTools.length + software.length + tutorials.length + guides.length + comparisons.length
    };
  }
}
