import { Component, input, signal } from '@angular/core';
import { FaqItem } from '../../../core/models/common.model';

@Component({
  selector: 'app-faq-accordion',
  templateUrl: './faq-accordion.html',
  styleUrl: './faq-accordion.scss'
})
export class FaqAccordion {
  readonly items = input.required<FaqItem[]>();
  readonly heading = input<string>('Frequently Asked Questions');

  readonly openIndex = signal<number | null>(0);

  toggle(index: number): void {
    this.openIndex.set(this.openIndex() === index ? null : index);
  }
}
