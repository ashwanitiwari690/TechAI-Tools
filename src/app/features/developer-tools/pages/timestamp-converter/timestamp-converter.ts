import { Component, computed, inject, signal } from '@angular/core';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { DeveloperToolsDirectory } from '../../services/developer-tools.service';
import { FaqItem } from '../../../../core/models/common.model';
import { CopyButton } from '../../../../shared/components/copy-button/copy-button';
import { Alert } from '../../../../shared/components/alert/alert';

@Component({
  selector: 'app-timestamp-converter',
  imports: [ToolLayout, CopyButton, Alert],
  templateUrl: './timestamp-converter.html'
})
export class TimestampConverter {
  readonly relatedTools = inject(DeveloperToolsDirectory).getRelated('timestamp-converter');

  readonly unixInput = signal(String(Math.floor(Date.now() / 1000)));
  readonly dateInput = signal(new Date().toISOString().slice(0, 19));

  readonly fromUnix = computed<{ iso: string; error: string | null }>(() => {
    const raw = this.unixInput().trim();
    if (!raw) {
      return { iso: '', error: null };
    }
    const num = Number(raw);
    if (Number.isNaN(num)) {
      return { iso: '', error: 'Enter a valid number of seconds (or milliseconds) since the Unix epoch.' };
    }
    const ms = raw.length > 10 ? num : num * 1000;
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) {
      return { iso: '', error: 'This value does not correspond to a valid date.' };
    }
    return { iso: date.toUTCString() + '\n' + date.toISOString(), error: null };
  });

  readonly fromDate = computed<{ unix: string; error: string | null }>(() => {
    const raw = this.dateInput().trim();
    if (!raw) {
      return { unix: '', error: null };
    }
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) {
      return { unix: '', error: 'Enter a valid date/time, e.g. 2026-01-15T09:30:00.' };
    }
    return { unix: String(Math.floor(date.getTime() / 1000)), error: null };
  });

  setNow(): void {
    const now = new Date();
    this.unixInput.set(String(Math.floor(now.getTime() / 1000)));
    this.dateInput.set(now.toISOString().slice(0, 19));
  }

  readonly howToUse = [
    'Enter a Unix timestamp (seconds or milliseconds) to convert it to a readable date.',
    'Or enter a date/time to convert it to a Unix timestamp.',
    'Click "Use current time" to fill both fields with the current moment.'
  ];

  readonly example = { input: '1700000000', output: 'Tue, 14 Nov 2023 22:13:20 GMT' };

  readonly useCases = [
    'Debugging timestamps found in API responses or database rows',
    'Converting log timestamps to a human-readable date',
    'Preparing test data with specific date/time values'
  ];

  readonly benefits = ['Supports both seconds and millisecond timestamps', 'Shows both UTC and ISO 8601 formats', 'Converts in both directions at once'];

  readonly limitations = ['Date parsing for the "Date to timestamp" field relies on the browser\'s Date parser — ISO 8601 format (YYYY-MM-DDTHH:mm:ss) is the most reliable.'];

  readonly faq: FaqItem[] = [
    {
      question: 'What is a Unix timestamp?',
      answer: 'It is the number of seconds (sometimes milliseconds) that have elapsed since 00:00:00 UTC on 1 January 1970, widely used to represent dates in computing.'
    },
    {
      question: 'How do I know if my timestamp is in seconds or milliseconds?',
      answer: 'A 10-digit number is typically seconds; a 13-digit number is typically milliseconds. This tool detects the difference automatically based on length.'
    }
  ];
}
