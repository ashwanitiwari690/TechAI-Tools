import { Component, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { ToolInput } from '../../components/tool-input/tool-input';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';
import { CopyButton } from '../../../../shared/components/copy-button/copy-button';

function toTitleCase(text: string): string {
  return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

function toSentenceCase(text: string): string {
  return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
}

function toCamelCase(text: string): string {
  const words = text.match(/[a-zA-Z0-9]+/g) ?? [];
  return words.map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase())).join('');
}

function toPascalCase(text: string): string {
  const words = text.match(/[a-zA-Z0-9]+/g) ?? [];
  return words.map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('');
}

function toSnakeCase(text: string): string {
  const words = text.match(/[a-zA-Z0-9]+/g) ?? [];
  return words.map((w) => w.toLowerCase()).join('_');
}

function toKebabCase(text: string): string {
  const words = text.match(/[a-zA-Z0-9]+/g) ?? [];
  return words.map((w) => w.toLowerCase()).join('-');
}

const CASES: { key: string; label: string; transform: (text: string) => string }[] = [
  { key: 'upper', label: 'UPPERCASE', transform: (t) => t.toUpperCase() },
  { key: 'lower', label: 'lowercase', transform: (t) => t.toLowerCase() },
  { key: 'title', label: 'Title Case', transform: toTitleCase },
  { key: 'sentence', label: 'Sentence case', transform: toSentenceCase },
  { key: 'camel', label: 'camelCase', transform: toCamelCase },
  { key: 'pascal', label: 'PascalCase', transform: toPascalCase },
  { key: 'snake', label: 'snake_case', transform: toSnakeCase },
  { key: 'kebab', label: 'kebab-case', transform: toKebabCase }
];

@Component({
  selector: 'app-case-converter',
  imports: [ToolLayout, ToolInput, CopyButton],
  templateUrl: './case-converter.html'
})
export class CaseConverter {
  readonly input = signal('Convert This Text To Any Case You Need');
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('case-converter');
  readonly cases = CASES;

  output(transform: (text: string) => string): string {
    return transform(this.input());
  }

  readonly howToUse = [
    'Type or paste your text into the input box.',
    'Every case style updates instantly below.',
    'Copy whichever version you need.'
  ];

  readonly example = { input: 'hello world example', output: 'helloWorldExample (camelCase), Hello World Example (Title Case), ...' };

  readonly useCases = [
    'Converting a title into a URL-friendly slug (kebab-case)',
    'Matching variable naming conventions across languages (camelCase, snake_case)',
    'Formatting headings consistently in Title Case'
  ];

  readonly benefits = ['Converts to eight case styles at once', 'Handles multi-word phrases and punctuation sensibly', 'Instant, browser-only conversion'];

  readonly limitations = ['Camel/Pascal/snake/kebab conversions strip punctuation other than letters and numbers, since those formats do not normally include it.'];

  readonly faq: FaqItem[] = [
    {
      question: 'What is the difference between camelCase and PascalCase?',
      answer: 'camelCase starts with a lowercase letter (myVariableName), while PascalCase starts with an uppercase letter (MyVariableName). Both are common in programming.'
    },
    {
      question: 'What is kebab-case used for?',
      answer: 'kebab-case (lowercase words separated by hyphens) is commonly used in URLs, CSS class names and file names.'
    }
  ];
}
