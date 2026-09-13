import { FaqItem } from './common.model';

export interface ComparisonFeatureRow {
  feature: string;
  itemA: string;
  itemB: string;
}

export interface ComparisonSide {
  name: string;
  slug: string;
  toolSlug: string | null;
  logoInitials: string;
  pricing: string;
  rating: number;
  pros: string[];
  cons: string[];
  bestFor: string;
}

export interface Comparison {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  itemA: ComparisonSide;
  itemB: ComparisonSide;
  featureRows: ComparisonFeatureRow[];
  verdict: string;
  faq: FaqItem[];
}
