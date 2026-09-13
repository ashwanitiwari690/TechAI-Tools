import { Component } from '@angular/core';

/**
 * Placeholder for a medium-rectangle sidebar ad unit (e.g. 300x250).
 * Replace inner content with the real AdSense <ins> tag at deploy time —
 * see ADSENSE_INTEGRATION.md.
 */
@Component({
  selector: 'app-ad-rectangle',
  template: `
    <div class="ad-slot ad-slot--rect" role="complementary" aria-label="Advertisement">
      <span class="ad-slot__label">Advertisement</span>
      <div class="ad-slot__placeholder">Ad space — 300×250</div>
    </div>
  `,
  styleUrl: './ad-rectangle.scss'
})
export class AdRectangle {}
