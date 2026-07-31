import { Component, input } from '@angular/core';

/**
 * Cabecera reutilizable (kicker + título + descripción) para mantener
 * tipografía y espaciado idénticos en todas las secciones.
 */
@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [],
  templateUrl: './section-title.html',
  styleUrl: './section-title.css',
})
export class SectionTitle {
  readonly kicker = input<string>('');
  readonly title = input.required<string>();
  readonly description = input<string>('');
  readonly align = input<'center' | 'left'>('center');
  /**
   * Peso tipográfico relativo de la sección dentro del relato de la página.
   * Evita que las 8 secciones que usan este componente se lean todas con
   * la misma escala (32/40px) — el tamaño refuerza qué secciones son el
   * clímax narrativo (xl/lg) y cuáles son de apoyo (sm).
   */
  readonly size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
}
