export type PricingType = 'Free' | 'Freemium' | 'Paid';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Author {
  name: string;
  role: string;
  avatarInitials: string;
}

export interface RelatedLink {
  label: string;
  routerLink: string[];
}
