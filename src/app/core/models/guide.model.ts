import { FaqItem } from './common.model';
import { TutorialSection } from './tutorial.model';

export type GuideCategory = 'AI Guides' | 'SEO Guides' | 'Developer Guides' | 'Software Guides' | 'Productivity Guides';

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: GuideCategory;
  publishedDate: string;
  readingTimeMinutes: number;
  imagePlaceholderLabel: string;
  sections: TutorialSection[];
  faq: FaqItem[];
  relatedGuideSlugs: string[];
}
