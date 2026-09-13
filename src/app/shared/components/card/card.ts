import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card" [class.card--interactive]="interactive()" [class.card--padded]="padded()">
      <ng-content />
    </div>
  `,
  styleUrl: './card.scss'
})
export class Card {
  readonly interactive = input(false);
  readonly padded = input(true);
}
