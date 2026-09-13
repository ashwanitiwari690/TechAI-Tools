import { Component, computed, inject, input } from '@angular/core';
import { CopyButton } from '../../../../shared/components/copy-button/copy-button';
import { Alert } from '../../../../shared/components/alert/alert';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-tool-output',
  imports: [CopyButton, Alert],
  templateUrl: './tool-output.html',
  styleUrl: './tool-output.scss'
})
export class ToolOutput {
  private readonly document = inject(DOCUMENT);

  readonly label = input<string>('Output');
  readonly value = input<string>('');
  readonly error = input<string | null>(null);
  readonly rows = input<number>(10);
  readonly downloadFilename = input<string | null>(null);

  readonly canDownload = computed(() => !!this.downloadFilename() && !!this.value() && !this.error());

  download(): void {
    const filename = this.downloadFilename();
    if (!filename) {
      return;
    }
    const blob = new Blob([this.value()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = this.document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
