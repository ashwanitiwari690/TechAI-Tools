import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumb, BreadcrumbItem } from '../../../../shared/components/breadcrumb/breadcrumb';
import { FaqAccordion } from '../../../../shared/components/faq-accordion/faq-accordion';
import { AdInArticle } from '../../../../shared/components/ad-in-article/ad-in-article';
import { AdRectangle } from '../../../../shared/components/ad-rectangle/ad-rectangle';
import { FaqItem } from '../../../../core/models/common.model';
import { DeveloperToolMeta } from '../../../../core/models/developer-tool.model';

export interface ToolExample {
  input: string;
  output: string;
}

@Component({
  selector: 'app-tool-layout',
  imports: [RouterLink, Breadcrumb, FaqAccordion, AdInArticle, AdRectangle],
  templateUrl: './tool-layout.html',
  styleUrl: './tool-layout.scss'
})
export class ToolLayout {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly whatIsIt = input<string>('');
  readonly howItWorks = input<string>('');
  readonly howToUse = input<string[]>([]);
  readonly example = input<ToolExample | null>(null);
  readonly useCases = input<string[]>([]);
  readonly benefits = input<string[]>([]);
  readonly limitations = input<string[]>([]);
  readonly faq = input<FaqItem[]>([]);
  readonly relatedTools = input<DeveloperToolMeta[]>([]);

  get breadcrumb(): BreadcrumbItem[] {
    return [
      { label: 'Home', link: ['/'] },
      { label: 'Developer Tools', link: ['/developer-tools'] },
      { label: this.title() }
    ];
  }
}
