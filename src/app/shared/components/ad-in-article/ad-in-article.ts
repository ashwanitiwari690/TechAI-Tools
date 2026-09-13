import { Component } from '@angular/core';

/**
 * Placeholder for an in-article/in-feed ad unit, meant to be dropped between
 * content sections (e.g. after an intro, mid-article). Replace inner content
 * with the real AdSense <ins> tag at deploy time — see ADSENSE_INTEGRATION.md.
 * Kept lightweight and clearly labeled so content always remains primary.
 */
@Component({
  selector: 'app-ad-in-article',
  template: `
    <div class="ad-slot ad-slot--in-article" role="complementary" aria-label="Advertisement">
      <span class="ad-slot__label">Advertisement</span>
      <div class="ad-slot__placeholder">In-article ad space</div>
    </div>
  `,
  styleUrl: './ad-in-article.scss'
})
export class AdInArticle {}
