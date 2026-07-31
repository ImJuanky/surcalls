import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChild,
  ViewChildren,
  signal,
} from '@angular/core';
import { SectionTitle } from '../../../../shared/components/section-title/section-title';
import { Icon, IconName } from '../../../../shared/components/icon/icon';
import { AnimatedCounter } from '../../../../shared/components/animated-counter/animated-counter';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';

interface Benefit {
  icon: IconName;
  title: string;
  text: string;
}

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [SectionTitle, Icon, AnimatedCounter, ScrollReveal],
  templateUrl: './benefits.html',
  styleUrl: './benefits.css',
})
export class Benefits implements AfterViewInit {
  @ViewChild('track') private readonly trackRef?: ElementRef<HTMLElement>;
  @ViewChildren('cardEl') private readonly cardEls?: QueryList<ElementRef<HTMLElement>>;

  readonly benefits: Benefit[] = [
    {
      icon: 'clock',
      title: 'Ahorra tiempo',
      text: 'Tu equipo deja de repetir las mismas preguntas y de perseguir la agenda. La IA se encarga de lo repetitivo.',
    },
    {
      icon: 'trending-up',
      title: 'Aumenta ventas',
      text: 'Cada llamada y cada mensaje es una oportunidad de venta que ya no se pierde por falta de respuesta.',
    },
    {
      icon: 'wallet',
      title: 'Reduce costes',
      text: 'Un agente de IA cuesta una fracción de un puesto a jornada completa, y no necesita turnos ni sustituciones.',
    },
    {
      icon: 'moon',
      title: 'Disponible 24/7',
      text: 'Atiende de noche, en festivos y fines de semana, cuando tu competencia tiene el contestador puesto.',
    },
    {
      icon: 'check-circle',
      title: 'Cero errores humanos',
      text: 'No se le olvida confirmar una cita, no se equivoca de precio y no tiene un mal día.',
    },
    {
      icon: 'bar-chart',
      title: 'Escala sin contratar',
      text: 'Atiende una llamada o cien a la vez, sin necesidad de ampliar plantilla.',
    },
  ];

  readonly activeIndex = signal(0);
  /** Ancho del espaciador de borde para que la primera y última tarjeta
   *  también puedan centrarse en el carrusel (no solo las intermedias). */
  readonly edgeSpacerPx = signal(24);

  private isDragging = false;
  private dragStartX = 0;
  private dragStartScroll = 0;
  private scrollRaf?: number;

  ngAfterViewInit(): void {
    this.updateEdgeSpacer();
    this.centerActive(true);
    // Las fuentes pueden llegar tarde y cambiar el ancho real de las
    // tarjetas; recentramos cuando estén listas para que el cálculo de
    // "tarjeta activa" sea preciso desde el primer render.
    document.fonts?.ready
      ?.then(() => {
        this.updateEdgeSpacer();
        this.centerActive(true);
      })
      .catch(() => {});
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateEdgeSpacer();
    this.centerActive(true);
  }

  next(): void {
    this.goTo(Math.min(this.activeIndex() + 1, this.benefits.length - 1));
  }

  prev(): void {
    this.goTo(Math.max(this.activeIndex() - 1, 0));
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
    this.centerActive(false);
  }

  /** Sincroniza el índice activo con la posición real de scroll (arrastre táctil/trackpad). */
  onScroll(): void {
    if (this.scrollRaf) {
      cancelAnimationFrame(this.scrollRaf);
    }
    this.scrollRaf = requestAnimationFrame(() => this.updateActiveFromScroll());
  }

  /** Convierte el scroll vertical del ratón en horizontal sobre el carrusel. */
  onWheel(event: WheelEvent): void {
    const track = this.trackRef?.nativeElement;
    if (!track) {
      return;
    }
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      track.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  }

  // ---------- Arrastre con ratón ----------

  onPointerDown(event: PointerEvent): void {
    const track = this.trackRef?.nativeElement;
    if (!track || event.pointerType !== 'mouse') {
      return;
    }
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragStartScroll = track.scrollLeft;
    track.setPointerCapture(event.pointerId);
    track.classList.add('is-dragging');
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) {
      return;
    }
    const track = this.trackRef?.nativeElement;
    if (!track) {
      return;
    }
    track.scrollLeft = this.dragStartScroll - (event.clientX - this.dragStartX);
  }

  onPointerUp(): void {
    if (!this.isDragging) {
      return;
    }
    this.isDragging = false;
    this.trackRef?.nativeElement.classList.remove('is-dragging');
    this.updateActiveFromScroll();
  }

  // ---------- Tilt + spotlight por tarjeta (solo estética, no toca Angular CD) ----------

  onCardPointerMove(event: PointerEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty('--tilt-x', `${(0.5 - y) * 8}`);
    card.style.setProperty('--tilt-y', `${(x - 0.5) * 8}`);
    card.style.setProperty('--spot-x', `${x * 100}%`);
    card.style.setProperty('--spot-y', `${y * 100}%`);
  }

  onCardPointerLeave(event: PointerEvent): void {
    const card = event.currentTarget as HTMLElement;
    card.style.setProperty('--tilt-x', '0');
    card.style.setProperty('--tilt-y', '0');
  }

  private updateActiveFromScroll(): void {
    const track = this.trackRef?.nativeElement;
    const cards = this.cardEls;
    if (!track || !cards || cards.length === 0) {
      return;
    }
    const center = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;
    cards.forEach((ref, i) => {
      const el = ref.nativeElement;
      const distance = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });
    if (closestIndex !== this.activeIndex()) {
      this.activeIndex.set(closestIndex);
    }
  }

  private centerActive(instant: boolean): void {
    const track = this.trackRef?.nativeElement;
    const card = this.cardEls?.get(this.activeIndex())?.nativeElement;
    if (!track || !card) {
      return;
    }
    const target = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({ left: target, behavior: instant ? 'auto' : 'smooth' });
  }

  private updateEdgeSpacer(): void {
    const track = this.trackRef?.nativeElement;
    const card = this.cardEls?.first?.nativeElement;
    if (!track || !card) {
      return;
    }
    this.edgeSpacerPx.set(Math.max(24, (track.clientWidth - card.clientWidth) / 2));
  }
}
