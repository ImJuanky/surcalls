import { Component } from '@angular/core';
import { SectionTitle } from '../../../../shared/components/section-title/section-title';
import { Button } from '../../../../shared/components/button/button';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';

interface TranscriptLine {
  from: 'client' | 'agent';
  text: string;
}

@Component({
  selector: 'app-ai-voice-agents',
  standalone: true,
  imports: [SectionTitle, Button, ScrollReveal],
  templateUrl: './ai-voice-agents.html',
  styleUrl: './ai-voice-agents.css',
})
export class AiVoiceAgents {
  readonly capabilities: string[] = [
    'Contestan cada llamada en el primer tono, 24 horas al día',
    'Hablan de forma natural, con voz humana y sin guion robótico',
    'Responden preguntas sobre precios, horarios y servicios',
    'Filtran clientes reales de curiosos antes de pasarte la llamada',
    'Hacen reservas y gestionan disponibilidad en tiempo real',
    'Agendan citas directamente en tu Google Calendar',
    'Venden: ofrecen upsells y cierran cuando el cliente ya está decidido',
    'Atienden fines de semana, festivos y fuera de horario laboral',
  ];

  readonly transcript: TranscriptLine[] = [
    { from: 'client', text: 'Hola, quería saber si tenéis hueco este jueves por la tarde.' },
    { from: 'agent', text: 'Claro, tengo disponibilidad el jueves a las 17:00 o a las 18:30. ¿Cuál te viene mejor?' },
    { from: 'client', text: 'A las 17:00, perfecto.' },
    { from: 'agent', text: 'Reservado. Te llegará la confirmación por WhatsApp en un momento. ¿Necesitas algo más?' },
  ];
}
