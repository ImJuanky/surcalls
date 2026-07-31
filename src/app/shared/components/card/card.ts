import { Component, input } from '@angular/core';

/**
 * Tarjeta de cristal reutilizable (icono + título + cuerpo vía ng-content)
 * usada en Services, Use Cases y Benefits para mantener el mismo estilo
 * de hover, borde y radio en toda la web.
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  readonly icon = input<string>('');
  readonly title = input<string>('');
}
