import { Component } from '@angular/core';

/**
 * Placeholder for a horizontal ad unit (e.g. leaderboard / responsive banner).
 * Replace the inner <div class="ad-slot"> with the real AdSense <ins> tag
 * (or ad-manager snippet) at deploy time — see ADSENSE_INTEGRATION.md.
 * Marked with a clear "Advertisement" label and kept visually distinct from
 * content so it can never be mistaken for a navigational or content element.
 */
@Component({
  selector: 'app-ad-banner',
  template: `
    <div class="ad-slot ad-slot--banner" role="complementary" aria-label="Advertisement">
      <span class="ad-slot__label">Advertisement</span>
      <div class="ad-slot__placeholder">Ad space — 728×90 / responsive banner</div>
    </div>
  `,
  styleUrl: './ad-banner.scss'
})
export class AdBanner {}
