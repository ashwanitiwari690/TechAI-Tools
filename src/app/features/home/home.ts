import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AiToolsService } from '../ai-tools/ai-tools.service';
import { TutorialsService } from '../tutorials/tutorials.service';
import { DeveloperToolsDirectory } from '../developer-tools/services/developer-tools.service';
import { AiToolCard } from '../ai-tools/components/ai-tool-card/ai-tool-card';
import { TutorialCard } from '../tutorials/components/tutorial-card/tutorial-card';
import { SearchBox } from '../../shared/components/search-box/search-box';
import { Button } from '../../shared/components/button/button';
import { Card } from '../../shared/components/card/card';
import { AdBanner } from '../../shared/components/ad-banner/ad-banner';
import { SeoService } from '../../core/services/seo.service';

interface CategoryTile {
  label: string;
  routerLink: string[];
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, ReactiveFormsModule, AiToolCard, TutorialCard, SearchBox, Button, Card, AdBanner],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private readonly aiTools = inject(AiToolsService);
  private readonly tutorials = inject(TutorialsService);
  private readonly developerToolsDirectory = inject(DeveloperToolsDirectory);
  private readonly fb = inject(FormBuilder);
  private readonly seo = inject(SeoService);

  readonly featuredTools = this.aiTools.getFeatured(6);
  readonly popularDeveloperTools = this.developerToolsDirectory.getAll().slice(0, 8);
  readonly latestTutorials = this.tutorials.getLatest(3);

  readonly categories: CategoryTile[] = [
    { label: 'AI Tools', routerLink: ['/ai-tools'] },
    { label: 'Developer Tools', routerLink: ['/developer-tools'] },
    { label: 'Productivity', routerLink: ['/ai-tools'] },
    { label: 'Writing', routerLink: ['/ai-tools'] },
    { label: 'Design', routerLink: ['/software'] },
    { label: 'Marketing', routerLink: ['/ai-tools'] },
    { label: 'SEO', routerLink: ['/ai-tools'] },
    { label: 'Automation', routerLink: ['/ai-tools'] },
    { label: 'Programming', routerLink: ['/tutorials'] },
    { label: 'Business', routerLink: ['/software'] }
  ];

  readonly newsletterForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  readonly newsletterSubmitted = signal(false);

  constructor() {
    this.seo.update({
      title: 'Discover Powerful AI & Software Tools',
      description:
        'Discover curated AI tools, developer utilities, software and practical tutorials — all in one place. Free browser-based developer tools included.',
      canonicalPath: '/'
    });
  }

  submitNewsletter(): void {
    if (this.newsletterForm.invalid) {
      this.newsletterForm.markAllAsTouched();
      return;
    }
    this.newsletterSubmitted.set(true);
    this.newsletterForm.reset();
  }
}
