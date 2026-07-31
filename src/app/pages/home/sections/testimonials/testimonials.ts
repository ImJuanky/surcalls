import { Component } from '@angular/core';
import { SectionTitle } from '../../../../shared/components/section-title/section-title';
import { Card } from '../../../../shared/components/card/card';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';

interface Guarantee {
  icon: string;
  title: string;
  text: string;
}

/**
 * NOTA PARA JUAN CARLOS:
 * Esta sección se llama "testimonials" en el código por consistencia con el
 * resto del proyecto, pero deliberadamente NO contiene citas de clientes.
 * Inventar opiniones o logos de clientes que no existen es publicidad
 * engañosa (y se nota). En su lugar, esta sección vende con garantías
 * concretas que sí puedes respaldar hoy.
 *
 * En cuanto tengas 2-3 clientes reales dispuestos a dar su opinión,
 * sustituye este contenido por sus citas reales (con nombre, negocio y,
 * si es posible, foto) — eso convierte muchísimo más que cualquier
 * garantía. Avísame cuando los tengas y lo cambiamos en cinco minutos.
 */
@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [SectionTitle, Card, ScrollReveal],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {
  readonly guarantees: Guarantee[] = [
    {
      icon: '🔓',
      title: 'Sin permanencia',
      text: 'Cancela cuando quieras. Si tu agente no te ahorra tiempo desde el primer mes, no tiene sentido que sigas pagando.',
    },
    {
      icon: '⚡',
      title: 'Implementación rápida',
      text: 'Tu agente empieza a atender llamadas o mensajes en días, no en meses de reuniones.',
    },
    {
      icon: '🎧',
      title: 'Soporte directo',
      text: 'Hablas con el equipo que construye tu agente, no con un ticket automático que tarda una semana en responder.',
    },
    {
      icon: '🎯',
      title: 'Pruébalo antes de decidir',
      text: 'Te enseñamos cómo suena y cómo responde tu propio agente, con tu caso real, antes de que firmes nada.',
    },
  ];
}
