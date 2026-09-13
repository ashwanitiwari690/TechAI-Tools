import { Component, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { ToolOutput } from '../../components/tool-output/tool-output';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';

const WORDS =
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(
    ' '
  );

function randomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function makeSentence(): string {
  const length = 6 + Math.floor(Math.random() * 10);
  const words = Array.from({ length }, () => randomWord());
  const sentence = words.join(' ');
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}

function makeParagraph(sentenceCount: number): string {
  return Array.from({ length: sentenceCount }, () => makeSentence()).join(' ');
}

type Unit = 'paragraphs' | 'sentences' | 'words';

@Component({
  selector: 'app-lorem-ipsum-generator',
  imports: [ToolLayout, ToolOutput],
  templateUrl: './lorem-ipsum-generator.html'
})
export class LoremIpsumGenerator {
  readonly unit = signal<Unit>('paragraphs');
  readonly count = signal(3);
  readonly startWithLorem = signal(true);
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('lorem-ipsum-generator');
  readonly output = signal('');

  constructor() {
    this.generate();
  }

  setUnit(unit: Unit): void {
    this.unit.set(unit);
  }

  setCount(value: string): void {
    this.count.set(Math.min(Math.max(Number(value) || 1, 1), 50));
  }

  generate(): void {
    const n = this.count();
    let result: string;

    if (this.unit() === 'words') {
      const words = Array.from({ length: n }, () => randomWord());
      result = words.join(' ');
    } else if (this.unit() === 'sentences') {
      result = Array.from({ length: n }, () => makeSentence()).join(' ');
    } else {
      result = Array.from({ length: n }, () => makeParagraph(4 + Math.floor(Math.random() * 3))).join('\n\n');
    }

    if (this.startWithLorem() && this.unit() !== 'words') {
      result = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + result;
    } else if (this.startWithLorem() && this.unit() === 'words') {
      result = 'lorem ipsum dolor sit amet ' + result;
    }

    this.output.set(result);
  }

  readonly howToUse = [
    'Choose whether you want paragraphs, sentences or words.',
    'Set how many you need and click Generate.',
    'Copy the placeholder text directly into your mockup or design.'
  ];

  readonly example = { input: '2 paragraphs', output: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...' };

  readonly useCases = ['Filling design mockups and wireframes with realistic-looking text', 'Testing how a layout handles varying amounts of content', 'Populating placeholder content while building a template'];

  readonly benefits = ['Generates paragraphs, sentences or individual words', 'Optional classic "Lorem ipsum dolor sit amet..." opening', 'Instant, unlimited regeneration'];

  readonly limitations = ['The generated text is pseudo-Latin placeholder text with no real meaning — do not use it as actual content.'];

  readonly faq: FaqItem[] = [
    {
      question: 'What is Lorem Ipsum?',
      answer:
        'Lorem Ipsum is placeholder text derived from a passage by Cicero, traditionally used in design and publishing to preview layouts without distracting readers with real content.'
    },
    {
      question: 'Can I generate just a few words instead of full paragraphs?',
      answer: 'Yes, switch the unit to "Words" and set the count to however many words you need.'
    }
  ];
}
