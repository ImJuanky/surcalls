import { Component, EventEmitter, Output, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

/**
 * CTA reutilizable. Se renderiza como <a> si recibe `href`, o como
 * <button> en caso contrario (para acciones de formulario, p.ej. submit).
 * El texto se proyecta con <ng-content>.
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly href = input<string | undefined>(undefined);
  readonly type = input<'button' | 'submit'>('button');
  readonly disabled = input(false);
  readonly fullWidth = input(false);

  @Output() pressed = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    this.pressed.emit(event);
  }
}
