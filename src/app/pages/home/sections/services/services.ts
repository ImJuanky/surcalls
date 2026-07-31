import { AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren, signal } from '@angular/core';
import { SectionTitle } from '../../../../shared/components/section-title/section-title';
import { Button } from '../../../../shared/components/button/button';
import { Icon, IconName } from '../../../../shared/components/icon/icon';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';

interface Service {
  icon: IconName;
  title: string;
  text: string;
  anchor: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [SectionTitle, Button, Icon, ScrollReveal],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements AfterViewInit {
  @ViewChild('listEl') private readonly listRef?: ElementRef<HTMLElement>;
  @ViewChildren('tabBtn') private readonly tabButtons?: QueryList<ElementRef<HTMLButtonElement>>;

  readonly services: Service[] = [
    {
      icon: 'phone',
      title: 'Agentes de IA para llamadas',
      text: 'Contestan cada llamada, filtran clientes, hacen reservas y venden. Sin turnos, sin bajas, sin llamadas perdidas fuera de horario.',
      anchor: '#ai-voice-agents',
    },
    {
      icon: 'message',
      title: 'Bots de WhatsApp con IA',
      text: 'Responden al instante, cualifican leads, envían presupuestos y quedan conectados a tu CRM. Tu WhatsApp de empresa, trabajando solo.',
      anchor: '#contact',
    },
    {
      icon: 'gear',
      title: 'Automatizaciones con IA',
      text: 'Conectamos WhatsApp, email, calendario, CRM y Stripe para que ningún proceso se vuelva a hacer a mano dos veces.',
      anchor: '#contact',
    },
    {
      icon: 'monitor',
      title: 'Desarrollo web',
      text: 'Webs rápidas, responsive y con SEO real, diseñadas para convertir visitantes en clientes, no solo para existir.',
      anchor: '#contact',
    },
    {
      icon: 'nfc',
      title: 'Soluciones NFC',
      text: 'Tarjetas, placas y stickers NFC que llevan a tus clientes directos a tus reseñas, tu carta digital o tu contacto en un toque.',
      anchor: '#contact',
    },
    {
      icon: 'star',
      title: 'Optimización de Google Business',
      text: 'Más reseñas, mejor posicionamiento local y más clientes que te encuentran antes que a tu competencia.',
      anchor: '#contact',
    },
  ];

  readonly activeIndex = signal(0);

  /**
   * Posición y alto reales del tab activo, medidos desde el DOM.
   * No usamos "1/6 de la altura total" vía CSS: si el título de un servicio
   * se parte en dos líneas en un ancho intermedio, esa suposición desalinea
   * el indicador con su fila. Medir el elemento real es correcto siempre.
   */
  readonly indicatorTop = signal(0);
  readonly indicatorHeight = signal(0);

  get active(): Service {
    return this.services[this.activeIndex()];
  }

  ngAfterViewInit(): void {
    this.updateIndicator();
    // Las fuentes pueden llegar después del primer render y cambiar la
    // altura de línea de los títulos; recalculamos cuando estén listas.
    document.fonts?.ready
      ?.then(() => this.updateIndicator())
      .catch(() => {});
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateIndicator();
  }

  select(index: number): void {
    this.activeIndex.set(index);
    this.updateIndicator();
  }

  private updateIndicator(): void {
    const list = this.listRef?.nativeElement;
    const button = this.tabButtons?.get(this.activeIndex())?.nativeElement;
    if (!list || !button) {
      return;
    }
    const listRect = list.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    this.indicatorTop.set(buttonRect.top - listRect.top);
    this.indicatorHeight.set(buttonRect.height);
  }
}
