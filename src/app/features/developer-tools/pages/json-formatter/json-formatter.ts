import { Component, computed, inject, signal } from '@angular/core';
import { ToolLayout, ToolExample } from '../../components/tool-layout/tool-layout';
import { ToolInput } from '../../components/tool-input/tool-input';
import { ToolOutput } from '../../components/tool-output/tool-output';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';

const EXAMPLE_INPUT = '{"name":"Ada Lovelace","role":"Mathematician","skills":["math","logic","writing"],"active":true}';

@Component({
  selector: 'app-json-formatter',
  imports: [ToolLayout, ToolInput, ToolOutput],
  templateUrl: './json-formatter.html'
})
export class JsonFormatter {
  readonly input = signal('');
  readonly indent = signal(2);
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('json-formatter');

  readonly result = computed<{ output: string; error: string | null }>(() => {
    const raw = this.input().trim();
    if (!raw) {
      return { output: '', error: null };
    }
    try {
      const parsed = JSON.parse(raw);
      return { output: JSON.stringify(parsed, null, this.indent()), error: null };
    } catch (e) {
      return { output: '', error: e instanceof Error ? `Invalid JSON: ${e.message}` : 'Invalid JSON input.' };
    }
  });

  readonly howToUse = [
    'Paste or type your JSON into the input box.',
    'Choose an indentation width of 2 or 4 spaces.',
    'Copy the formatted output, or download it as a .json file.'
  ];

  readonly example: ToolExample = {
    input: '{"a":1,"b":[1,2,3]}',
    output: '{\n  "a": 1,\n  "b": [\n    1,\n    2,\n    3\n  ]\n}'
  };

  readonly useCases = [
    'Reviewing an API response before debugging',
    'Cleaning up config files before committing them',
    'Making minified JSON readable again'
  ];

  readonly benefits = [
    'Runs fully in your browser — nothing is uploaded',
    'Instant feedback as you type',
    'Clear error messages for invalid JSON'
  ];

  readonly limitations = ['Very large JSON payloads (tens of MB) may be slow to format in the browser.'];

  readonly faq: FaqItem[] = [
    {
      question: 'Is my JSON data uploaded anywhere?',
      answer: 'No. Formatting happens entirely in your browser using JavaScript — your data never leaves your device.'
    },
    {
      question: 'What happens if my JSON is invalid?',
      answer: 'The tool shows an error message describing the JSON syntax problem so you can fix it.'
    },
    {
      question: 'Can I choose 4-space indentation instead of 2?',
      answer: 'Yes, use the indentation control above the input to switch between 2 and 4 spaces.'
    }
  ];

  loadExample(): void {
    this.input.set(EXAMPLE_INPUT);
  }

  setIndent(value: string): void {
    this.indent.set(Number(value));
  }
}
