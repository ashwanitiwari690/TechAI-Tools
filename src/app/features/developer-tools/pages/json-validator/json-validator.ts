import { Component, computed, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { ToolInput } from '../../components/tool-input/tool-input';
import { ToolOutput } from '../../components/tool-output/tool-output';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';

const EXAMPLE_INPUT = '{"name": "Ada", "valid": true, "list": [1, 2, 3]}';
const EXAMPLE_INVALID = '{"name": "Ada", "valid": true, "list": [1, 2, 3]';

@Component({
  selector: 'app-json-validator',
  imports: [ToolLayout, ToolInput, ToolOutput],
  templateUrl: './json-validator.html'
})
export class JsonValidator {
  readonly input = signal('');
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('json-validator');

  readonly result = computed<{ output: string; error: string | null }>(() => {
    const raw = this.input().trim();
    if (!raw) {
      return { output: '', error: null };
    }
    try {
      JSON.parse(raw);
      return { output: 'Valid JSON ✓\n\nYour JSON is syntactically correct.', error: null };
    } catch (e) {
      return { output: '', error: e instanceof Error ? `Invalid JSON: ${e.message}` : 'Invalid JSON input.' };
    }
  });

  readonly howToUse = [
    'Paste the JSON you want to check into the input box.',
    'The tool validates it instantly as you type.',
    'If it is invalid, read the error message to locate the problem.'
  ];

  readonly example = { input: EXAMPLE_INVALID, output: 'Unexpected end of JSON input (missing closing bracket)' };

  readonly useCases = [
    'Checking a config file before deploying it',
    'Debugging a broken API request body',
    'Verifying JSON pasted from documentation or a chat tool'
  ];

  readonly benefits = [
    'Instant, browser-only validation with no upload',
    'Clear error messages instead of a silent failure',
    'Works with deeply nested objects and arrays'
  ];

  readonly limitations = ['Reports the first syntax error found — fixing it may reveal additional errors further in the file.'];

  readonly faq: FaqItem[] = [
    {
      question: 'What is the difference between this and the JSON Formatter?',
      answer:
        'The JSON Formatter focuses on pretty-printing valid JSON, while the JSON Validator focuses on clearly reporting whether JSON is valid and why it is not.'
    },
    {
      question: 'Does it tell me exactly which line has the error?',
      answer:
        'It surfaces the underlying parser error message, which often references a character position. Use it together with your editor to pinpoint the exact line.'
    }
  ];

  loadExample(): void {
    this.input.set(EXAMPLE_INPUT);
  }
}
