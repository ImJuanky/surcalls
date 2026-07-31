import { Component } from '@angular/core';
import { SectionTitle } from '../../../../shared/components/section-title/section-title';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';

interface Integration {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [SectionTitle, ScrollReveal],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.css',
})
export class TechStack {
  readonly integrations: Integration[] = [
    { icon: '💬', name: 'WhatsApp' },
    { icon: '✉️', name: 'Email' },
    { icon: '🗂️', name: 'CRM' },
    { icon: '📅', name: 'Google Calendar' },
    { icon: '💳', name: 'Stripe' },
    { icon: '🧡', name: 'HubSpot' },
    { icon: '⚡', name: 'Zapier' },
    { icon: '🔗', name: 'Make' },
    { icon: '🧩', name: 'APIs a medida' },
    { icon: '🗄️', name: 'Bases de datos' },
  ];
}
