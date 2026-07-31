import { Component } from '@angular/core';
import { SectionTitle } from '../../../../shared/components/section-title/section-title';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';

interface Step {
  number: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [SectionTitle, ScrollReveal],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css',
})
export class HowItWorks {
  readonly steps: Step[] = [
    {
      number: '01',
      title: 'Analizamos tu negocio',
      text: 'Estudiamos tus llamadas, tu WhatsApp y tus procesos actuales para detectar dónde pierdes tiempo y clientes.',
    },
    {
      number: '02',
      title: 'Diseñamos tu agente',
      text: 'Configuramos el agente de voz o el bot con tu tono de marca, tus servicios, tus precios y tus horarios reales.',
    },
    {
      number: '03',
      title: 'Lo conectamos a tus herramientas',
      text: 'Integramos calendario, CRM y pagos para que actúe de verdad: reserve, cobre y actualice, no solo hable.',
    },
    {
      number: '04',
      title: 'Lanzamos y optimizamos',
      text: 'Tu agente sale en vivo en días, no meses. Lo afinamos con datos reales de cada llamada y conversación.',
    },
  ];
}
