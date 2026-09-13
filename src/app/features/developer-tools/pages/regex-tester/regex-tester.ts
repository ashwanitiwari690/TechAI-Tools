import { Component, computed, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { ToolInput } from '../../components/tool-input/tool-input';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';
import { Alert } from '../../../../shared/components/alert/alert';
import { Badge } from '../../../../shared/components/badge/badge';

@Component({
  selector: 'app-regex-tester',
  imports: [ToolLayout, ToolInput, Alert, Badge],
  templateUrl: './regex-tester.html'
})
export class RegexTester {
  readonly pattern = signal('\\b[\\w.-]+@[\\w.-]+\\.\\w+\\b');
  readonly flags = signal('g');
  readonly testText = signal('Contact us at hello@example.com or support@techai-tools.example for help.');
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('regex-tester');

  readonly result = computed<{ matches: string[]; error: string | null }>(() => {
    const patternValue = this.pattern();
    if (!patternValue) {
      return { matches: [], error: null };
    }
    try {
      const globalFlags = this.flags().includes('g') ? this.flags() : this.flags() + 'g';
      const regex = new RegExp(patternValue, globalFlags);
      const matches = Array.from(this.testText().matchAll(regex)).map((m) => m[0]);
      return { matches, error: null };
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : 'Invalid regular expression.' };
    }
  });

  setFlags(value: string): void {
    this.flags.set(value.replace(/[^gimsuy]/g, ''));
  }

  readonly howToUse = [
    'Enter a regular expression pattern (without the surrounding slashes).',
    'Choose flags such as g (global) or i (case-insensitive).',
    'Paste the text you want to test against, and matches highlight automatically.'
  ];

  readonly example = { input: 'Pattern: \\d+  |  Text: Order #42 shipped on day 7', output: 'Matches: 42, 7' };

  readonly useCases = [
    'Building and debugging a validation pattern for a form field',
    'Extracting structured values (emails, IDs, dates) from text',
    'Learning regex syntax with immediate visual feedback'
  ];

  readonly benefits = ['Instant match highlighting as you type', 'Supports all standard JavaScript regex flags', 'Clear error messages for invalid patterns'];

  readonly limitations = ['Uses JavaScript\'s regex engine — syntax can differ slightly from PCRE, Python or other languages\' regex flavors.'];

  readonly faq: FaqItem[] = [
    {
      question: 'What do the flags g, i, m mean?',
      answer:
        'g finds all matches instead of stopping at the first, i makes matching case-insensitive, and m allows ^ and $ to match the start/end of each line rather than the whole string.'
    },
    {
      question: 'Why do I need to escape characters like . or \\ ?',
      answer:
        'Characters like . * + ? ( ) [ ] { } | ^ $ \\ have special meaning in regular expressions. Prefix them with a backslash to match them literally.'
    }
  ];
}
