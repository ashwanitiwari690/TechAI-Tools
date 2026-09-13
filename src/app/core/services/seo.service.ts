import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}

const SITE_NAME = 'TechAI Tools';
const SITE_URL = 'https://www.techai-tools.example';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

/**
 * Centralized SEO helper for setting title/meta/canonical/OG/Twitter tags.
 *
 * IMPORTANT — SSR/prerendering note:
 * This app currently runs as a client-side rendered (CSR) Angular application.
 * Tags set here are applied AFTER the initial HTML is parsed, via JavaScript.
 * Search engine crawlers that execute JavaScript (modern Googlebot) can usually
 * see these tags, but many other crawlers, social-media link previewers, and
 * some SEO tools only read the raw server-delivered HTML and will NOT see
 * content injected client-side. For guaranteed, crawler-agnostic SEO
 * (correct meta tags in the initial HTML response, faster Largest Contentful
 * Paint, and reliable social share previews), this application should be
 * upgraded to Angular SSR (`@angular/ssr`) or fully prerendered at build time.
 * The SeoService API is intentionally framework-agnostic so that swapping the
 * rendering strategy later does not require changing call sites.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(metadata: SeoMetadata): void {
    const fullTitle = `${metadata.title} | ${SITE_NAME}`;
    this.titleService.setTitle(fullTitle);

    this.setTag('name', 'description', metadata.description);
    this.setTag('property', 'og:site_name', SITE_NAME);
    this.setTag('property', 'og:title', fullTitle);
    this.setTag('property', 'og:description', metadata.description);
    this.setTag('property', 'og:type', metadata.ogType ?? 'website');
    this.setTag('property', 'og:image', metadata.ogImage ?? DEFAULT_OG_IMAGE);
    this.setTag('name', 'twitter:card', 'summary_large_image');
    this.setTag('name', 'twitter:title', fullTitle);
    this.setTag('name', 'twitter:description', metadata.description);
    this.setTag('name', 'twitter:image', metadata.ogImage ?? DEFAULT_OG_IMAGE);
    this.setTag('name', 'robots', metadata.noIndex ? 'noindex, nofollow' : 'index, follow');

    const canonicalUrl = `${SITE_URL}${metadata.canonicalPath ?? ''}`;
    this.setCanonical(canonicalUrl);
    this.setTag('property', 'og:url', canonicalUrl);
  }

  private setTag(attr: 'name' | 'property', value: string, content: string): void {
    this.meta.updateTag({ [attr]: value, content });
  }

  private setCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
