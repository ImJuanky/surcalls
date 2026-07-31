import { Component } from '@angular/core';
import { SectionTitle } from '../../../../shared/components/section-title/section-title';
import { Icon, IconName } from '../../../../shared/components/icon/icon';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';

interface UseCase {
  icon: IconName;
  sector: string;
  text: string;
}

@Component({
  selector: 'app-use-cases',
  standalone: true,
  imports: [SectionTitle, Icon, ScrollReveal],
  templateUrl: './use-cases.html',
  styleUrl: './use-cases.css',
})
export class UseCases {
  readonly useCases: UseCase[] = [
    {
      icon: 'utensils',
      sector: 'Restauración',
      text: 'El teléfono suena en pleno servicio y nadie puede cogerlo. Tu agente toma la reserva, confirma el aforo y la anota, sin interrumpir a tu equipo en sala.',
    },
    {
      icon: 'cross',
      sector: 'Clínicas',
      text: 'Pacientes que llaman fuera de horario para pedir cita. Tu agente agenda, cancela y reprograma directamente en tu calendario, 24 horas al día.',
    },
    {
      icon: 'home',
      sector: 'Inmobiliarias',
      text: 'Decenas de leads de portales cada semana, la mayoría curiosos. Tu agente filtra en la primera llamada quién está listo para visitar.',
    },
    {
      icon: 'wrench',
      sector: 'Talleres',
      text: 'Clientes preguntando presupuestos y disponibilidad todo el día. Tu bot de WhatsApp responde al instante y cierra la cita para revisión.',
    },
    {
      icon: 'building',
      sector: 'Hoteles',
      text: 'Llamadas de reserva que se pierden cuando recepción está saturada. Tu agente informa de disponibilidad y tarifas, y confirma sin esperas.',
    },
    {
      icon: 'briefcase',
      sector: 'Servicios profesionales',
      text: 'Cada llamada perdida es un cliente que se va a la competencia. Tu agente agenda la primera consulta sin que nadie tenga que descolgar.',
    },
  ];
}
