import { Component, computed, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { ToolInput } from '../../components/tool-input/tool-input';
import { ToolOutput } from '../../components/tool-output/tool-output';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';

const EXAMPLE_INPUT = '{\n  "name": "Ada Lovelace",\n  "skills": ["math", "logic"]\n}';

@Component({
  selector: 'app-json-minifier',
  imports: [ToolLayout, ToolInput, ToolOutput],
  templateUrl: './json-minifier.html'
})
export class JsonMinifier {
  readonly input = signal('');
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('json-minifier');

  readonly result = computed<{ output: string; error: string | null }>(() => {
    const raw = this.input().trim();
    if (!raw) {
      return { output: '', error: null };
    }
    try {
      const parsed = JSON.parse(raw);
      return { output: JSON.stringify(parsed), error: null };
    } catch (e) {
      return { output: '', error: e instanceof Error ? `Invalid JSON: ${e.message}` : 'Invalid JSON input.' };
    }
  });

  readonly savedBytes = computed(() => {
    const before = this.input().length;
    const after = this.result().output.length;
    if (!before || !after) {
      return 0;
    }
    return Math.max(0, Math.round(((before - after) / before) * 100));
  });

  readonly howToUse = [
    'Paste formatted or indented JSON into the input box.',
    'The minified, whitespace-free version appears instantly on the right.',
    'Copy or download the compact JSON for production use.'
  ];

  readonly example = { input: EXAMPLE_INPUT, output: '{"name":"Ada Lovelace","skills":["math","logic"]}' };

  readonly useCases = [
    'Reducing payload size before sending JSON over a network',
    'Preparing compact JSON fixtures for tests',
    'Shrinking configuration files bundled with an app'
  ];

  readonly benefits = ['Removes all unnecessary whitespace and line breaks', 'Runs instantly in your browser', 'Keeps data structure and values unchanged'];

  readonly limitations = ['Minifying does not change the semantic content — always keep a formatted copy for version control diffs.'];

  readonly faq: FaqItem[] = [
    {
      question: 'Does minifying change the data in my JSON?',
      answer: 'No, only whitespace and line breaks are removed. All keys, values and structure remain identical.'
    },
    {
      question: 'Why would I minify JSON?',
      answer: 'Minified JSON is smaller, which reduces network transfer size for APIs and can slightly speed up parsing for very large payloads.'
    }
  ];

  loadExample(): void {
    this.input.set(EXAMPLE_INPUT);
  }
}
