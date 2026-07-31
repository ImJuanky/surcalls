import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

/**
 * Centraliza el <title> y las meta tags (description, Open Graph, Twitter
 * Card) para que cada página/sección pueda fijar su propio SEO sin tocar
 * index.html directamente.
 */
@Injectable({
  providedIn: 'root',
})
export class Seo {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);

  update(data: SeoData): void {
    this.titleService.setTitle(data.title);

    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });

    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
    }

    if (data.url) {
      this.meta.updateTag({ property: 'og:url', content: data.url });
    }
  }
}
