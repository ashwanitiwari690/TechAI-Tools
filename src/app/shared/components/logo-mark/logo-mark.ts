import { Component, input } from '@angular/core';

let nextGradientId = 0;

@Component({
  selector: 'app-logo-mark',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="TechAI Tools logo"
    >
      <defs>
        <linearGradient [attr.id]="gradientId" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#4f46e5" />
          <stop offset="1" stop-color="#0891b2" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" [attr.fill]="'url(#' + gradientId + ')'" />
      <rect x="16" y="22" width="32" height="7" rx="3.5" fill="#ffffff" />
      <rect x="28.5" y="22" width="7" height="26" rx="3.5" fill="#ffffff" />
      <circle cx="46" cy="16.5" r="5" fill="#fbbf24" />
    </svg>
  `
})
export class LogoMark {
  readonly size = input<number>(34);
  readonly gradientId = `logo-mark-grad-${nextGradientId++}`;
}
