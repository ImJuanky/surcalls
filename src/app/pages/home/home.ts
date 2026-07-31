import { Component, OnInit, inject } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Footer } from '../../layout/footer/footer';
import { Hero } from './sections/hero/hero';
import { TrustBar } from './sections/trust-bar/trust-bar';
import { WhatWeDo } from './sections/what-we-do/what-we-do';
import { Services } from './sections/services/services';
import { AiVoiceAgents } from './sections/ai-voice-agents/ai-voice-agents';
import { HowItWorks } from './sections/how-it-works/how-it-works';
import { UseCases } from './sections/use-cases/use-cases';
import { Benefits } from './sections/benefits/benefits';
import { TechStack } from './sections/tech-stack/tech-stack';
import { Testimonials } from './sections/testimonials/testimonials';
import { Contact } from './sections/contact/contact';
import { Seo } from '../../core/services/seo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Navbar,
    Footer,
    Hero,
    TrustBar,
    WhatWeDo,
    Services,
    AiVoiceAgents,
    HowItWorks,
    UseCases,
    Benefits,
    TechStack,
    Testimonials,
    Contact,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly seo = inject(Seo);

  ngOnInit(): void {
    this.seo.update({
      title: 'SURCALLS — Agentes de IA que contestan, agendan y venden por ti',
      description:
        'Automatizamos llamadas, WhatsApp y procesos con Inteligencia Artificial. Agentes de voz 24/7, bots de WhatsApp, automatizaciones, webs y soluciones NFC para negocios que no quieren perder ni un cliente.',
    });
  }
}
