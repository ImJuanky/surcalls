import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * Contador que cuenta desde 0 hasta `target` cuando entra en el viewport.
 * Usado en la sección Benefits para reforzar las cifras clave con movimiento.
 */
@Component({
  selector: 'app-animated-counter',
  standalone: true,
  imports: [],
  templateUrl: './animated-counter.html',
  styleUrl: './animated-counter.css',
})
export class AnimatedCounter implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private frame?: number;

  readonly target = input.required<number>();
  readonly prefix = input<string>('');
  readonly suffix = input<string>('');
  readonly decimals = input<number>(0);
  readonly durationMs = input<number>(1600);

  readonly displayValue = signal('0');

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.setValue(this.target());
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.animate();
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }
  }

  private animate(): void {
    const start = performance.now();
    const target = this.target();
    const duration = this.durationMs();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      this.setValue(target * eased);

      if (progress < 1) {
        this.frame = requestAnimationFrame(step);
      } else {
        this.setValue(target);
      }
    };

    this.frame = requestAnimationFrame(step);
  }

  private setValue(value: number): void {
    if (this.decimals() === 0) {
      // Separador de miles (es-ES) para cifras grandes tipo "1.247" — con
      // decimales, mejor un toFixed simple (evita redondeos raros de Intl).
      this.displayValue.set(Math.round(value).toLocaleString('es-ES'));
    } else {
      this.displayValue.set(value.toFixed(this.decimals()));
    }
  }
}
