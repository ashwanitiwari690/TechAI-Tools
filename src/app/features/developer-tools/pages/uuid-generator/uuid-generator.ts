import { Component, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { ToolOutput } from '../../components/tool-output/tool-output';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';

@Component({
  selector: 'app-uuid-generator',
  imports: [ToolLayout, ToolOutput],
  templateUrl: './uuid-generator.html'
})
export class UuidGenerator {
  readonly count = signal(5);
  readonly uppercase = signal(false);
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('uuid-generator');
  readonly uuids = signal<string[]>([]);

  constructor() {
    this.generate();
  }

  get output(): string {
    const list = this.uuids();
    return this.uppercase() ? list.join('\n').toUpperCase() : list.join('\n');
  }

  generate(): void {
    const n = Math.min(Math.max(this.count(), 1), 100);
    this.uuids.set(Array.from({ length: n }, () => crypto.randomUUID()));
  }

  setCount(value: string): void {
    this.count.set(Number(value) || 1);
  }

  toggleUppercase(): void {
    this.uppercase.set(!this.uppercase());
  }

  readonly howToUse = [
    'Choose how many UUIDs you need (1 to 100).',
    'Click Generate to create a fresh batch of random UUIDs.',
    'Copy all of them at once, or download them as a text file.'
  ];

  readonly example = { input: '(click Generate)', output: 'e6a3f1c2-9b7d-4e21-8c4a-1f2b3d4e5f6a' };

  readonly useCases = [
    'Creating unique primary keys or identifiers for test data',
    'Generating request/trace IDs for debugging and logging',
    'Producing placeholder IDs while prototyping an app'
  ];

  readonly benefits = [
    'Uses the browser\'s cryptographically secure crypto.randomUUID()',
    'Generates many UUIDs at once',
    'No data ever leaves your device'
  ];

  readonly limitations = ['Generates version 4 (random) UUIDs only — this tool does not create name-based (v3/v5) or time-based (v1) UUIDs.'];

  readonly faq: FaqItem[] = [
    {
      question: 'What version of UUID does this generate?',
      answer: 'It generates version 4 UUIDs, which are based on random numbers and are extremely unlikely to collide.'
    },
    {
      question: 'Are these UUIDs safe to use as database primary keys?',
      answer: 'Yes, UUID v4 is commonly used as a primary key when you want globally unique identifiers without a central counter.'
    }
  ];
}
