import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/**
 * Revela un elemento (fade + slide-up) la primera vez que entra en el viewport.
 * La animación visual vive en styles.css (`[appScrollReveal]` / `.is-visible`)
 * para poder compartirla entre todas las secciones sin duplicar CSS.
 *
 * Uso:
 *   <div appScrollReveal>...</div>
 *   <div [appScrollReveal]="120">...</div>  // retraso de 120ms (para escalonar tarjetas)
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollReveal implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  /** Acepta número o string porque en plantillas se usa a menudo como
   *  atributo plano (appScrollReveal="120") en vez de binding ([appScrollReveal]="120"). */
  readonly delayMs = input<number | string>(0, { alias: 'appScrollReveal' });

  /**
   * Variante de entrada. Por defecto 'up' (fade + slide-up, el estándar de
   * todo el sitio). Un puñado de secciones con personalidad propia usan
   * una variante distinta para no repetir siempre el mismo gesto — ver
   * ai-voice-agents (blur, entrada "enfoque"), use-cases (side, coherente
   * con sus filas alternadas) y testimonials (scale, gesto de "sello").
   */
  readonly variant = input<'up' | 'side-left' | 'side-right' | 'scale' | 'blur'>('up', {
    alias: 'revealVariant',
  });

  ngOnInit(): void {
    const node = this.el.nativeElement;

    if (this.variant() !== 'up') {
      node.classList.add(`reveal--${this.variant()}`);
    }

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    const delay = Number(this.delayMs()) || 0;
    if (delay) {
      node.style.transitionDelay = `${delay}ms`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('is-visible');
            this.observer?.unobserve(node);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
