import { Author, Difficulty, FaqItem } from './common.model';

export type TutorialCategory =
  | 'AI'
  | 'Angular'
  | 'JavaScript'
  | 'TypeScript'
  | 'Node.js'
  | 'Web Development'
  | 'Programming'
  | 'Developer Tools'
  | 'Productivity';

export interface TutorialSection {
  heading: string;
  level: 2 | 3;
  paragraphs?: string[];
  bullets?: string[];
  numbered?: string[];
  code?: { language: string; snippet: string };
  table?: { headers: string[]; rows: string[][] };
}

export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  category: TutorialCategory;
  author: Author;
  publishedDate: string;
  updatedDate: string;
  readingTimeMinutes: number;
  difficulty: Difficulty;
  featured: boolean;
  imagePlaceholderLabel: string;
  tags: string[];
  relatedToolSlugs: string[];
  relatedTutorialSlugs: string[];
  sections: TutorialSection[];
  faq: FaqItem[];
}
