import { Component, computed, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { ToolInput } from '../../components/tool-input/tool-input';
import { ToolOutput } from '../../components/tool-output/tool-output';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';

function formatCss(input: string, indentSize: number): string {
  let out = '';
  let depth = 0;
  let buffer = '';
  let i = 0;
  const n = input.length;
  const indent = () => ' '.repeat(depth * indentSize);
  const flush = () => {
    const value = buffer;
    buffer = '';
    return value.trim();
  };

  while (i < n) {
    const ch = input[i];

    if (ch === '/' && input[i + 1] === '*') {
      const end = input.indexOf('*/', i + 2);
      const comment = input.slice(i, end === -1 ? n : end + 2);
      const pending = flush();
      if (pending) out += indent() + pending + '\n';
      out += indent() + comment + '\n';
      i = end === -1 ? n : end + 2;
      continue;
    }

    if (ch === '{') {
      const selector = flush();
      out += indent() + selector + ' {\n';
      depth++;
      i++;
      continue;
    }

    if (ch === '}') {
      const declaration = flush();
      if (declaration) out += indent() + declaration + (declaration.endsWith(';') ? '' : ';') + '\n';
      depth = Math.max(depth - 1, 0);
      out += indent() + '}\n';
      i++;
      continue;
    }

    if (ch === ';') {
      const declaration = flush();
      if (declaration) out += indent() + declaration + ';\n';
      i++;
      continue;
    }

    buffer += ch;
    i++;
  }

  const rest = flush();
  if (rest) out += indent() + rest + '\n';
  return out.trim();
}

const EXAMPLE_INPUT = '.card{padding:16px;border-radius:8px}.card h2{font-size:20px;margin:0}';

@Component({
  selector: 'app-css-formatter',
  imports: [ToolLayout, ToolInput, ToolOutput],
  templateUrl: './css-formatter.html'
})
export class CssFormatter {
  readonly input = signal('');
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('css-formatter');

  readonly output = computed(() => {
    const raw = this.input().trim();
    return raw ? formatCss(raw, 2) : '';
  });

  readonly howToUse = ['Paste minified or single-line CSS into the input box.', 'A cleanly indented stylesheet appears automatically.', 'Copy or download the result.'];

  readonly example = {
    input: EXAMPLE_INPUT,
    output: '.card {\n  padding: 16px;\n  border-radius: 8px;\n}\n.card h2 {\n  font-size: 20px;\n  margin: 0;\n}'
  };

  readonly useCases = ['Reviewing minified CSS from a production site', 'Cleaning up styles copied from a browser dev tools panel', 'Making a generated stylesheet easier to read before editing'];

  readonly benefits = ['One declaration per line for easy scanning', 'Preserves comments', 'Handles nested rules like @media blocks'];

  readonly limitations = ['This is a lightweight, rule-based formatter — it does not validate CSS syntax or reorder/optimize properties, only reformats spacing and indentation.'];

  readonly faq: FaqItem[] = [
    {
      question: 'Does this tool validate my CSS?',
      answer: 'No, it only reformats spacing and indentation. Use a linter such as Stylelint in your editor to catch invalid or unsupported CSS.'
    },
    {
      question: 'Will it work with SCSS or LESS?',
      answer: 'It works reasonably well for basic nesting, but SCSS/LESS-specific syntax (like variables with special operators or mixins) is not specifically understood.'
    }
  ];

  loadExample(): void {
    this.input.set(EXAMPLE_INPUT);
  }
}
