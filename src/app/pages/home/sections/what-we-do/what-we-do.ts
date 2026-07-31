import { Component } from '@angular/core';
import { Icon } from '../../../../shared/components/icon/icon';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';

@Component({
  selector: 'app-what-we-do',
  imports: [Icon, ScrollReveal],
  standalone: true,
  templateUrl: './what-we-do.html',
  styleUrl: './what-we-do.css',
})
export class WhatWeDo {}
