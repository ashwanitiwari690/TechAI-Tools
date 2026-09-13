import { Component, input } from '@angular/core';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.html',
  styleUrl: './alert.scss'
})
export class Alert {
  readonly variant = input<AlertVariant>('info');
}
