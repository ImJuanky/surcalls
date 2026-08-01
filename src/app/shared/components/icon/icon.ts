import { Component, input } from '@angular/core';

export type IconName =
  | 'phone'
  | 'message'
  | 'gear'
  | 'monitor'
  | 'nfc'
  | 'star'
  | 'mic'
  | 'utensils'
  | 'cross'
  | 'home'
  | 'wrench'
  | 'building'
  | 'briefcase'
  | 'clock'
  | 'trending-up'
  | 'wallet'
  | 'moon'
  | 'check-circle'
  | 'bar-chart'
  | 'mail'
  | 'folder'
  | 'calendar'
  | 'card'
  | 'layers'
  | 'zap'
  | 'link'
  | 'code'
  | 'database'
  | 'unlock'
  | 'headset'
  | 'target'
  | 'chevron-left'
  | 'chevron-right'
  | 'cpu';

/**
 * Set de iconos de trazo propio (SVG inline, sin dependencias externas).
 * Sustituye al emoji como iconografía de producto: el emoji lo renderiza
 * el sistema operativo del visitante (aspecto distinto en Windows/macOS/
 * Android), así que la marca no tiene control real sobre su propio icono.
 * Con SVG + `currentColor`, el tamaño y el color los define el CSS del
 * contenedor (mismo patrón que usa cualquier sistema de iconos serio).
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon {
  /**
   * String en vez de IconName a propósito: así Card y otros componentes
   * genéricos no necesitan acoplarse al tipo estricto. Los arrays de datos
   * de cada sección sí pueden tipar sus campos como IconName para tener
   * autocompletado y evitar erratas en el nombre del icono.
   */
  readonly name = input.required<string>();
}
