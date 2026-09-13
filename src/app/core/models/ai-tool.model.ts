import { FaqItem, PricingType } from './common.model';

export type AiToolCategory =
  | 'Writing'
  | 'Coding'
  | 'Image Generation'
  | 'Video'
  | 'Audio'
  | 'Marketing'
  | 'SEO'
  | 'Productivity'
  | 'Research'
  | 'Education'
  | 'Business';

export interface AiTool {
  slug: string;
  name: string;
  logoInitials: string;
  description: string;
  shortDescription: string;
  category: AiToolCategory;
  pricing: PricingType;
  rating: number;
  reviewCount: number;
  tags: string[];
  websiteUrl: string;
  featured: boolean;
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  alternatives: string[];
  relatedTutorialSlugs: string[];
  faq: FaqItem[];
}
