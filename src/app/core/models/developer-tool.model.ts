export type DeveloperToolCategory = 'Formatting' | 'Encoding' | 'Text' | 'Generators' | 'Converters' | 'Web';

export interface DeveloperToolMeta {
  slug: string;
  name: string;
  shortDescription: string;
  category: DeveloperToolCategory;
  icon: string;
}
