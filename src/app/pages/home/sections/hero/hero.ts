import { Component } from '@angular/core';
import { Icon } from '../../../../shared/components/icon/icon';
import { AnimatedCounter } from '../../../../shared/components/animated-counter/animated-counter';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [Icon, AnimatedCounter, ScrollReveal],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {}
