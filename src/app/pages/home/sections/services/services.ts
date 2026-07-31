import { Component } from '@angular/core';
import { SectionTitle } from '../../../../shared/components/section-title/section-title';
import { Card } from '../../../../shared/components/card/card';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';

interface Service {
  icon: string;
  title: string;
  text: string;
  anchor: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [SectionTitle, Card, ScrollReveal],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  readonly services: Service[] = [
    {
      icon: '📞',
      title: 'Agentes de IA para llamadas',
      text: 'Contestan cada llamada, filtran clientes, hacen reservas y venden. Sin turnos, sin bajas, sin llamadas perdidas fuera de horario.',
      anchor: '#ai-voice-agents',
    },
    {
      icon: '💬',
      title: 'Bots de WhatsApp con IA',
      text: 'Responden al instante, cualifican leads, envían presupuestos y quedan conectados a tu CRM. Tu WhatsApp de empresa, trabajando solo.',
      anchor: '#contact',
    },
    {
      icon: '⚙️',
      title: 'Automatizaciones con IA',
      text: 'Conectamos WhatsApp, email, calendario, CRM y Stripe para que ningún proceso se vuelva a hacer a mano dos veces.',
      anchor: '#contact',
    },
    {
      icon: '💻',
      title: 'Desarrollo web',
      text: 'Webs rápidas, responsive y con SEO real, diseñadas para convertir visitantes en clientes, no solo para existir.',
      anchor: '#contact',
    },
    {
      icon: '📲',
      title: 'Soluciones NFC',
      text: 'Tarjetas, placas y stickers NFC que llevan a tus clientes directos a tus reseñas, tu carta digital o tu contacto en un toque.',
      anchor: '#contact',
    },
    {
      icon: '⭐',
      title: 'Optimización de Google Business',
      text: 'Más reseñas, mejor posicionamiento local y más clientes que te encuentran antes que a tu competencia.',
      anchor: '#contact',
    },
  ];
}
