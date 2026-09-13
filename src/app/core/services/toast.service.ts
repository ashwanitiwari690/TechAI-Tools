import { Injectable, signal } from '@angular/core';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  text: string;
  variant: ToastVariant;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 1;
  readonly toasts = signal<ToastMessage[]>([]);

  show(text: string, variant: ToastVariant = 'info', durationMs = 3200): void {
    const id = this.nextId++;
    this.toasts.update((list) => [...list, { id, text, variant }]);
    setTimeout(() => this.dismiss(id), durationMs);
  }

  success(text: string): void {
    this.show(text, 'success');
  }

  error(text: string): void {
    this.show(text, 'error');
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((toast) => toast.id !== id));
  }
}
