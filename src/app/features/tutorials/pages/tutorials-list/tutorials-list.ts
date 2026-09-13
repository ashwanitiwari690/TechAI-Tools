import { Component, computed, inject, signal } from '@angular/core';
import { TutorialsService } from '../../tutorials.service';
import { TutorialCard } from '../../components/tutorial-card/tutorial-card';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { AdBanner } from '../../../../shared/components/ad-banner/ad-banner';
import { Difficulty } from '../../../../core/models/common.model';
import { SeoService } from '../../../../core/services/seo.service';

const PAGE_SIZE = 9;

@Component({
  selector: 'app-tutorials-list',
  imports: [TutorialCard, Breadcrumb, EmptyState, Pagination, AdBanner],
  templateUrl: './tutorials-list.html',
  styleUrl: './tutorials-list.scss'
})
export class TutorialsList {
  private readonly tutorialsService = inject(TutorialsService);
  private readonly seo = inject(SeoService);

  readonly allTutorials = this.tutorialsService.getAll();
  readonly categories = ['All', ...Array.from(new Set(this.allTutorials.map((t) => t.category)))];
  readonly difficulties: ('All' | Difficulty)[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  readonly searchTerm = signal('');
  readonly activeCategory = signal('All');
  readonly activeDifficulty = signal<'All' | Difficulty>('All');
  readonly page = signal(1);

  readonly featured = this.tutorialsService.getFeatured(3);

  readonly filtered = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const category = this.activeCategory();
    const difficulty = this.activeDifficulty();

    return [...this.allTutorials]
      .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
      .filter((tutorial) => {
        const matchesCategory = category === 'All' || tutorial.category === category;
        const matchesDifficulty = difficulty === 'All' || tutorial.difficulty === difficulty;
        const matchesSearch =
          !term || tutorial.title.toLowerCase().includes(term) || tutorial.description.toLowerCase().includes(term);
        return matchesCategory && matchesDifficulty && matchesSearch;
      });
  });

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)));

  readonly pagedTutorials = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  readonly breadcrumb = [{ label: 'Home', link: ['/'] }, { label: 'Tutorials' }];

  constructor() {
    this.seo.update({
      title: 'Tutorials — AI, Angular, JavaScript & Developer Guides',
      description: 'Practical, in-depth tutorials on AI tools, Angular, JavaScript, TypeScript, Node.js and general web development.',
      canonicalPath: '/tutorials'
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

  updateDifficulty(value: 'All' | Difficulty): void {
    this.activeDifficulty.set(value);
    this.page.set(1);
  }
}
