import { Component, computed, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { ToolInput } from '../../components/tool-input/tool-input';
import { ToolOutput } from '../../components/tool-output/tool-output';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';

type Mode = 'encode' | 'decode';

@Component({
  selector: 'app-url-encoder-decoder',
  imports: [ToolLayout, ToolInput, ToolOutput],
  templateUrl: './url-encoder-decoder.html'
})
export class UrlEncoderDecoder {
  readonly mode = signal<Mode>('encode');
  readonly input = signal('');
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('url-encoder-decoder');

  readonly result = computed<{ output: string; error: string | null }>(() => {
    const raw = this.input();
    if (!raw) {
      return { output: '', error: null };
    }
    try {
      return { output: this.mode() === 'encode' ? encodeURIComponent(raw) : decodeURIComponent(raw), error: null };
    } catch {
      return { output: '', error: 'Could not decode — this does not look like a validly percent-encoded string.' };
    }
  });

  setMode(mode: Mode): void {
    this.mode.set(mode);
  }

  readonly howToUse = [
    'Choose Encode to percent-encode text for use in a URL, or Decode to reverse it.',
    'Paste the text or URL component into the input box.',
    'Copy the resulting output.'
  ];

  readonly useCases = [
    'Safely including special characters (spaces, &, ?, #) in a query string',
    'Decoding a URL parameter copied from browser address bars or logs',
    'Building URLs programmatically in scripts or documentation'
  ];

  readonly benefits = ['Correctly percent-encodes reserved and Unicode characters', 'Instant two-way conversion', 'Runs entirely in your browser'];

  readonly limitations = ['Encodes individual components — it does not validate or construct a full, well-formed URL.'];

  readonly faq: FaqItem[] = [
    {
      question: 'What is percent-encoding?',
      answer:
        'Percent-encoding (URL encoding) replaces characters that are unsafe in a URL with a % followed by their hexadecimal code, so URLs remain valid across systems.'
    },
    {
      question: 'Should I encode an entire URL or just a parameter value?',
      answer:
        'Typically you encode individual query parameter values, not the whole URL (which would also encode characters like ":" and "/" that should stay literal).'
    }
  ];

  get example() {
    return this.mode() === 'encode'
      ? { input: 'name=John Doe&city=New York', output: 'name%3DJohn%20Doe%26city%3DNew%20York' }
      : { input: 'name%3DJohn%20Doe%26city%3DNew%20York', output: 'name=John Doe&city=New York' };
  }

  loadExample(): void {
    this.input.set(this.mode() === 'encode' ? 'name=John Doe&city=New York' : 'name%3DJohn%20Doe%26city%3DNew%20York');
  }
}
