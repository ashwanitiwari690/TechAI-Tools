import { Component, computed, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { ToolInput } from '../../components/tool-input/tool-input';
import { ToolOutput } from '../../components/tool-output/tool-output';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';

type Mode = 'encode' | 'decode';

@Component({
  selector: 'app-base64',
  imports: [ToolLayout, ToolInput, ToolOutput],
  templateUrl: './base64.html'
})
export class Base64Tool {
  readonly mode = signal<Mode>('encode');
  readonly input = signal('');
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('base64');

  readonly result = computed<{ output: string; error: string | null }>(() => {
    const raw = this.input();
    if (!raw) {
      return { output: '', error: null };
    }
    try {
      if (this.mode() === 'encode') {
        return { output: btoa(unescape(encodeURIComponent(raw))), error: null };
      }
      return { output: decodeURIComponent(escape(atob(raw.trim()))), error: null };
    } catch {
      return { output: '', error: 'Could not decode — this does not look like valid Base64 text.' };
    }
  });

  setMode(mode: Mode): void {
    this.mode.set(mode);
  }

  readonly howToUse = [
    'Choose Encode to turn plain text into Base64, or Decode to reverse it.',
    'Paste your text into the input box.',
    'Copy the resulting output.'
  ];

  readonly useCases = [
    'Embedding small binary-like data inside JSON or URLs',
    'Decoding Base64 values found in JWTs, emails or config files',
    'Preparing data URIs for small images or fonts'
  ];

  readonly benefits = ['Handles Unicode text correctly, not just ASCII', 'Runs entirely offline in your browser', 'Instant two-way conversion'];

  readonly limitations = ['Not intended for encrypting sensitive data — Base64 is an encoding, not encryption, and is trivially reversible.'];

  readonly faq: FaqItem[] = [
    {
      question: 'Is Base64 encoding the same as encryption?',
      answer: 'No. Base64 only re-represents data in a different text format; it provides no confidentiality and is easily reversed by anyone.'
    },
    {
      question: 'Why does decoding sometimes fail?',
      answer: 'Decoding fails if the input contains characters outside the Base64 alphabet or has incorrect padding — double check you copied the full string.'
    }
  ];

  get example() {
    return this.mode() === 'encode'
      ? { input: 'Hello, world!', output: 'SGVsbG8sIHdvcmxkIQ==' }
      : { input: 'SGVsbG8sIHdvcmxkIQ==', output: 'Hello, world!' };
  }

  loadExample(): void {
    this.input.set(this.mode() === 'encode' ? 'Hello, world!' : 'SGVsbG8sIHdvcmxkIQ==');
  }
}
