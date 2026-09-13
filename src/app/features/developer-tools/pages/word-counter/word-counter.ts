import { Component, computed, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { ToolInput } from '../../components/tool-input/tool-input';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';

@Component({
  selector: 'app-word-counter',
  imports: [ToolLayout, ToolInput],
  templateUrl: './word-counter.html'
})
export class WordCounter {
  readonly input = signal('');
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('word-counter');

  readonly stats = computed(() => {
    const text = this.input();
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+/g)?.length ?? (text.trim() ? 1 : 0)) : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));
    return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTimeMinutes };
  });

  readonly howToUse = [
    'Paste or type your text into the input box.',
    'Word, character, sentence and paragraph counts update as you type.',
    'Use the estimated reading time as a guide for articles and scripts.'
  ];

  readonly example = { input: 'This is a short example sentence. It has two sentences!', output: 'Words: 10, Characters: 55, Sentences: 2' };

  readonly useCases = [
    'Checking if a piece of writing fits a word or character limit',
    'Estimating reading time for a blog post or script',
    'Tracking writing progress on an essay or article'
  ];

  readonly benefits = ['Updates instantly as you type', 'Counts words, characters, sentences and paragraphs together', 'Works with long-form text without lag'];

  readonly limitations = ['Sentence detection is based on simple punctuation rules and may miscount unusual abbreviations or ellipses.'];

  readonly faq: FaqItem[] = [
    {
      question: 'How is reading time calculated?',
      answer: 'It assumes an average reading speed of about 200 words per minute, rounded up to the nearest minute.'
    },
    {
      question: 'Does this count characters with or without spaces?',
      answer: 'Both are shown separately, so you can check against limits that count either way.'
    }
  ];
}
