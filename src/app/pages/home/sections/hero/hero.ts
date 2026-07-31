import { Component } from '@angular/core';
import { Icon } from '../../../../shared/components/icon/icon';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [Icon, ScrollReveal],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {}
