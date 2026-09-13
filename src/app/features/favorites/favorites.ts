import { Component, computed, inject } from '@angular/core';
import { FavoritesService } from '../../core/services/favorites.service';
import { AiToolsService } from '../ai-tools/ai-tools.service';
import { SoftwareService } from '../software/software.service';
import { TutorialsService } from '../tutorials/tutorials.service';
import { GuidesService } from '../guides/guides.service';
import { AiToolCard } from '../ai-tools/components/ai-tool-card/ai-tool-card';
import { SoftwareCard } from '../software/components/software-card/software-card';
import { TutorialCard } from '../tutorials/components/tutorial-card/tutorial-card';
import { GuideCard } from '../guides/components/guide-card/guide-card';
import { EmptyState } from '../../shared/components/empty-state/empty-state';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-favorites',
  imports: [AiToolCard, SoftwareCard, TutorialCard, GuideCard, EmptyState],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss'
})
export class Favorites {
  private readonly favorites = inject(FavoritesService);
  private readonly aiTools = inject(AiToolsService);
  private readonly software = inject(SoftwareService);
  private readonly tutorials = inject(TutorialsService);
  private readonly guides = inject(GuidesService);
  private readonly seo = inject(SeoService);

  readonly favoriteAiTools = computed(() =>
    this.favorites
      .byType('ai-tool')
      .map((f) => this.aiTools.getBySlug(f.slug))
      .filter((t): t is NonNullable<typeof t> => !!t)
  );

  readonly favoriteSoftware = computed(() =>
    this.favorites
      .byType('software')
      .map((f) => this.software.getBySlug(f.slug))
      .filter((s): s is NonNullable<typeof s> => !!s)
  );

  readonly favoriteTutorials = computed(() =>
    this.favorites
      .byType('tutorial')
      .map((f) => this.tutorials.getBySlug(f.slug))
      .filter((t): t is NonNullable<typeof t> => !!t)
  );

  readonly favoriteGuides = computed(() =>
    this.favorites
      .byType('guide')
      .map((f) => this.guides.getBySlug(f.slug))
      .filter((g): g is NonNullable<typeof g> => !!g)
  );

  readonly isEmpty = computed(
    () =>
      this.favoriteAiTools().length === 0 &&
      this.favoriteSoftware().length === 0 &&
      this.favoriteTutorials().length === 0 &&
      this.favoriteGuides().length === 0
  );

  constructor() {
    this.seo.update({
      title: 'Your Favorites',
      description: 'AI tools, software, tutorials and guides you have saved for quick access.',
      canonicalPath: '/favorites',
      noIndex: true
    });
  }
}
