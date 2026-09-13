import { Component, HostListener, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal {
  readonly heading = input.required<string>();
  readonly closed = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closed.emit();
  }

  close(): void {
    this.closed.emit();
  }
}
