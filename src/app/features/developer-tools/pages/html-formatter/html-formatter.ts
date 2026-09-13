import { Component, computed, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { ToolInput } from '../../components/tool-input/tool-input';
import { ToolOutput } from '../../components/tool-output/tool-output';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';

const VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

function formatHtml(html: string, indentSize: number): string {
  const tokens = html.match(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g) ?? [];
  let depth = 0;
  const lines: string[] = [];
  const indent = (d: number) => ' '.repeat(Math.max(d, 0) * indentSize);

  for (const raw of tokens) {
    const token = raw.trim();
    if (!token) continue;

    if (token.startsWith('<!--') || /^<!doctype/i.test(token)) {
      lines.push(indent(depth) + token);
      continue;
    }

    if (token.startsWith('</')) {
      depth = Math.max(depth - 1, 0);
      lines.push(indent(depth) + token);
      continue;
    }

    if (token.startsWith('<')) {
      const tagName = token.match(/^<([a-zA-Z0-9-]+)/)?.[1]?.toLowerCase() ?? '';
      const selfClosing = /\/>\s*$/.test(token) || VOID_ELEMENTS.has(tagName);
      lines.push(indent(depth) + token);
      if (!selfClosing) {
        depth++;
      }
      continue;
    }

    lines.push(indent(depth) + token);
  }

  return lines.join('\n');
}

const EXAMPLE_INPUT = '<div class="card"><h2>Title</h2><p>Some text</p></div>';

@Component({
  selector: 'app-html-formatter',
  imports: [ToolLayout, ToolInput, ToolOutput],
  templateUrl: './html-formatter.html'
})
export class HtmlFormatter {
  readonly input = signal('');
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('html-formatter');

  readonly output = computed(() => {
    const raw = this.input().trim();
    return raw ? formatHtml(raw, 2) : '';
  });

  readonly howToUse = ['Paste minified or messy HTML into the input box.', 'A cleanly indented version appears automatically.', 'Copy or download the result.'];

  readonly example = { input: EXAMPLE_INPUT, output: '<div class="card">\n  <h2>Title</h2>\n  <p>Some text</p>\n</div>' };

  readonly useCases = ['Making minified HTML from a live site readable for review', 'Cleaning up markup pasted from a design tool or CMS', 'Reviewing template output during development'];

  readonly benefits = ['Runs entirely client-side', 'Handles void elements (img, br, input, etc.) correctly', 'Preserves comments and doctype declarations'];

  readonly limitations = ['This is a lightweight, rule-based formatter, not a full HTML parser — it does not fix invalid or unclosed markup, and very unusual formatting may not indent perfectly.'];

  readonly faq: FaqItem[] = [
    {
      question: 'Will this fix broken HTML?',
      answer: 'No, it only reformats indentation for markup that is already reasonably well-formed. It does not validate or repair invalid HTML.'
    },
    {
      question: 'Does it change my actual content or attributes?',
      answer: 'No, only whitespace and line breaks between tags are changed — tag names, attributes and text content are left untouched.'
    }
  ];

  loadExample(): void {
    this.input.set(EXAMPLE_INPUT);
  }
}
