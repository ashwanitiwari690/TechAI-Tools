import { FaqItem, PricingType } from './common.model';

export type SoftwareCategory =
  | 'Developer'
  | 'Productivity'
  | 'Design'
  | 'Business'
  | 'Security'
  | 'Video'
  | 'Audio'
  | 'Education'
  | 'Marketing';

export interface SoftwareItem {
  slug: string;
  name: string;
  logoInitials: string;
  description: string;
  shortDescription: string;
  category: SoftwareCategory;
  operatingSystems: string[];
  pricing: PricingType;
  rating: number;
  reviewCount: number;
  websiteUrl: string;
  featured: boolean;
  features: string[];
  pros: string[];
  cons: string[];
  faq: FaqItem[];
}
