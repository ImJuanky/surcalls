import { Component } from '@angular/core';
import { SectionTitle } from '../../../../shared/components/section-title/section-title';
import { Card } from '../../../../shared/components/card/card';
import { AnimatedCounter } from '../../../../shared/components/animated-counter/animated-counter';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';

interface Benefit {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [SectionTitle, Card, AnimatedCounter, ScrollReveal],
  templateUrl: './benefits.html',
  styleUrl: './benefits.css',
})
export class Benefits {
  readonly benefits: Benefit[] = [
    {
      icon: '⏱️',
      title: 'Ahorra tiempo',
      text: 'Tu equipo deja de repetir las mismas preguntas y de perseguir la agenda. La IA se encarga de lo repetitivo.',
    },
    {
      icon: '📈',
      title: 'Aumenta ventas',
      text: 'Cada llamada y cada mensaje es una oportunidad de venta que ya no se pierde por falta de respuesta.',
    },
    {
      icon: '💸',
      title: 'Reduce costes',
      text: 'Un agente de IA cuesta una fracción de un puesto a jornada completa, y no necesita turnos ni sustituciones.',
    },
    {
      icon: '🌙',
      title: 'Disponible 24/7',
      text: 'Atiende de noche, en festivos y fines de semana, cuando tu competencia tiene el contestador puesto.',
    },
    {
      icon: '✅',
      title: 'Cero errores humanos',
      text: 'No se le olvida confirmar una cita, no se equivoca de precio y no tiene un mal día.',
    },
    {
      icon: '📊',
      title: 'Escala sin contratar',
      text: 'Atiende una llamada o cien a la vez, sin necesidad de ampliar plantilla.',
    },
  ];
}
