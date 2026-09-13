import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Injects JSON-LD <script type="application/ld+json"> blocks into <head>.
 * Only call the *-schema builders on pages that genuinely contain the
 * corresponding content (e.g. only use faqPageSchema when real FAQ content
 * is rendered on the page) to avoid misleading/fake structured data.
 */
@Injectable({ providedIn: 'root' })
export class StructuredDataService {
  private readonly document = inject(DOCUMENT);
  private readonly elementId = 'techai-structured-data';

  set(schema: Record<string, unknown> | Record<string, unknown>[]): void {
    this.remove();
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = this.elementId;
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  remove(): void {
    this.document.getElementById(this.elementId)?.remove();
  }

  breadcrumbSchema(items: { name: string; url: string }[]): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  }

  articleSchema(params: {
    headline: string;
    description: string;
    url: string;
    imageUrl: string;
    authorName: string;
    datePublished: string;
    dateModified: string;
  }): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: params.headline,
      description: params.description,
      image: [params.imageUrl],
      author: { '@type': 'Person', name: params.authorName },
      datePublished: params.datePublished,
      dateModified: params.dateModified,
      mainEntityOfPage: { '@type': 'WebPage', '@id': params.url }
    };
  }

  softwareApplicationSchema(params: {
    name: string;
    description: string;
    category: string;
    ratingValue: number;
    ratingCount: number;
    pricing: string;
  }): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: params.name,
      description: params.description,
      applicationCategory: params.category,
      offers: {
        '@type': 'Offer',
        price: params.pricing === 'Free' ? '0' : undefined,
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: params.ratingValue,
        ratingCount: params.ratingCount
      }
    };
  }

  faqPageSchema(faq: { question: string; answer: string }[]): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer }
      }))
    };
  }
}
