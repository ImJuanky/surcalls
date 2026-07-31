import { Component } from '@angular/core';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ScrollReveal],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {}
