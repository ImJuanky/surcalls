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
}
