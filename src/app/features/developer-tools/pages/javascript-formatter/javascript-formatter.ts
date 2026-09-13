import { Component, computed, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { ToolInput } from '../../components/tool-input/tool-input';
import { ToolOutput } from '../../components/tool-output/tool-output';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';

function formatJavaScript(input: string, indentSize: number): string {
  let out = '';
  let depth = 0;
  let groupDepth = 0;
  let buffer = '';
  let i = 0;
  const n = input.length;
  const indent = () => ' '.repeat(Math.max(depth, 0) * indentSize);

  const flushLine = () => {
    const value = buffer.trim();
    buffer = '';
    if (value) out += indent() + value + '\n';
  };

  while (i < n) {
    const ch = input[i];
    const two = input.slice(i, i + 2);

    if (two === '//') {
      const end = input.indexOf('\n', i);
      buffer += input.slice(i, end === -1 ? n : end);
      i = end === -1 ? n : end;
      continue;
    }

    if (two === '/*') {
      const end = input.indexOf('*/', i + 2);
      buffer += input.slice(i, end === -1 ? n : end + 2);
      i = end === -1 ? n : end + 2;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      let j = i + 1;
      let str = ch;
      while (j < n) {
        str += input[j];
        if (input[j] === '\\') {
          j++;
          if (j < n) str += input[j];
          j++;
          continue;
        }
        if (input[j] === quote) {
          j++;
          break;
        }
        j++;
      }
      buffer += str;
      i = j;
      continue;
    }

    if (ch === '(' || ch === '[') {
      groupDepth++;
      buffer += ch;
      i++;
      continue;
    }

    if (ch === ')' || ch === ']') {
      groupDepth = Math.max(groupDepth - 1, 0);
      buffer += ch;
      i++;
      continue;
    }

    if (ch === '{' && groupDepth === 0) {
      const pending = buffer.trim();
      buffer = '';
      out += indent() + pending + (pending ? ' ' : '') + '{\n';
      depth++;
      i++;
      continue;
    }

    if (ch === '}' && groupDepth === 0) {
      flushLine();
      depth = Math.max(depth - 1, 0);
      out += indent() + '}\n';
      i++;
      continue;
    }

    if (ch === ';' && groupDepth === 0) {
      buffer += ';';
      flushLine();
      i++;
      continue;
    }

    if (ch === '\n' && groupDepth === 0 && buffer.trim() === '') {
      i++;
      continue;
    }

    buffer += ch;
    i++;
  }

  flushLine();
  return out.replace(/\n{3,}/g, '\n\n').trim();
}

const EXAMPLE_INPUT = 'function greet(name){if(!name){return "Hello, stranger!";}return `Hello, ${name}!`;}';

@Component({
  selector: 'app-javascript-formatter',
  imports: [ToolLayout, ToolInput, ToolOutput],
  templateUrl: './javascript-formatter.html'
})
export class JavascriptFormatter {
  readonly input = signal('');
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('javascript-formatter');

  readonly output = computed(() => {
    const raw = this.input().trim();
    return raw ? formatJavaScript(raw, 2) : '';
  });

  readonly howToUse = ['Paste minified or compact JavaScript into the input box.', 'An indented version appears automatically based on braces and statements.', 'Copy or download the result.'];

  readonly example = {
    input: EXAMPLE_INPUT,
    output: 'function greet(name) {\n  if (!name) {\n    return "Hello, stranger!";\n  }\n  return `Hello, ${name}!`;\n}'
  };

  readonly useCases = ['Making minified JavaScript from a production bundle readable for inspection', 'Getting a quick readable view of a code snippet found online', 'Reformatting code before pasting it into documentation'];

  readonly benefits = ['Runs fully offline in your browser', 'Understands strings, template literals and comments so it won\'t break on braces inside them', 'No account or upload required'];

  readonly limitations = [
    'This is a lightweight, heuristic formatter based on brace and statement structure — it is not a full AST-based formatter like Prettier.',
    'Complex expressions (nested ternaries, chained method calls, JSX) may not be perfectly indented. For production codebases, use Prettier or ESLint in your editor/build pipeline.'
  ];

  readonly faq: FaqItem[] = [
    {
      question: 'Is this a replacement for Prettier or ESLint?',
      answer:
        'No. This tool provides quick, dependency-free formatting for readability. For production projects, a proper AST-based formatter like Prettier, wired into your editor or build process, is strongly recommended.'
    },
    {
      question: 'Will it break my code?',
      answer: 'It only reformats whitespace and line breaks between statements; it does not attempt to modify logic. Still, always keep a backup of the original before overwriting it.'
    }
  ];

  loadExample(): void {
    this.input.set(EXAMPLE_INPUT);
  }
}
