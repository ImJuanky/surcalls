import { Component } from '@angular/core';
import { SectionTitle } from '../../../../shared/components/section-title/section-title';
import { Icon, IconName } from '../../../../shared/components/icon/icon';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';

interface Integration {
  icon: IconName;
  name: string;
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [SectionTitle, Icon, ScrollReveal],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.css',
})
export class TechStack {
  readonly integrations: Integration[] = [
    { icon: 'message', name: 'WhatsApp' },
    { icon: 'mail', name: 'Email' },
    { icon: 'folder', name: 'CRM' },
    { icon: 'calendar', name: 'Google Calendar' },
    { icon: 'card', name: 'Stripe' },
    { icon: 'layers', name: 'HubSpot' },
    { icon: 'zap', name: 'Zapier' },
    { icon: 'link', name: 'Make' },
    { icon: 'code', name: 'APIs a medida' },
    { icon: 'database', name: 'Bases de datos' },
  ];
}
