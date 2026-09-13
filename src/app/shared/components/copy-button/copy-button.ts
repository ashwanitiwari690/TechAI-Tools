import { Component, inject, input, signal } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.html',
  styleUrl: './copy-button.scss'
})
export class CopyButton {
  private readonly toast = inject(ToastService);

  readonly text = input<string>('');
  readonly label = input<string>('Copy');

  readonly copied = signal(false);

  async copy(): Promise<void> {
    const value = this.text();
    if (!value) {
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      this.copied.set(true);
      this.toast.success('Copied to clipboard');
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      this.toast.error('Could not copy — please copy manually');
    }
  }
}
