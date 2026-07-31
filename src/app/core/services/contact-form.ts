import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

export interface ContactPayload {
  name: string;
  business: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
}

export interface ContactOption {
  value: string;
  label: string;
}

/**
 * ===========================================================
 * CONFIGURACIÓN DE EMAILJS — rellenar antes de publicar la web
 * ===========================================================
 * 1. Crea una cuenta gratuita en https://www.emailjs.com/ (con
 *    surcallshelp@gmail.com).
 * 2. Email Services → Add New Service → Gmail → conecta
 *    surcallshelp@gmail.com → copia el "Service ID" en SERVICE_ID.
 * 3. Email Templates → Create New Template → usa estas variables
 *    en el cuerpo del email: {{name}} {{business}} {{phone}}
 *    {{email}} {{interest}} {{message}} → copia el "Template ID"
 *    en TEMPLATE_ID.
 * 4. Account → General → copia la "Public Key" en PUBLIC_KEY.
 *
 * Mientras estos tres valores estén vacíos, el formulario sigue
 * funcionando (valida y no rompe nada) pero avisa por consola de
 * que no se ha enviado ningún email real.
 */
const EMAILJS_SERVICE_ID = 'service_8uj68em';
const EMAILJS_TEMPLATE_ID = 'template_jxsfuzp';
const EMAILJS_PUBLIC_KEY = 'XB4qV1iqTWPQExZqu';

@Injectable({
  providedIn: 'root',
})
export class ContactForm {
  readonly interests: ContactOption[] = [
    { value: 'voice-agents', label: 'Agentes de IA para llamadas' },
    { value: 'whatsapp', label: 'Bots de WhatsApp con IA' },
    { value: 'automation', label: 'Automatizaciones con IA' },
    { value: 'web', label: 'Desarrollo web' },
    { value: 'nfc', label: 'Soluciones NFC' },
    { value: 'google-business', label: 'Optimización de Google Business' },
    { value: 'other', label: 'Otro / todavía no lo tengo claro' },
  ];

  async submit(payload: ContactPayload): Promise<{ ok: true }> {
    const isConfigured = EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY;

    if (!isConfigured) {
      console.warn(
        '[SURCALLS] EmailJS no está configurado todavía (ver contact-form.ts). ' +
          'El lead NO se ha enviado a ningún sitio, solo se muestra en consola:',
        payload,
      );
      // Simula la latencia de un envío real para no romper la UX del formulario
      // mientras se configura EmailJS.
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { ok: true };
    }

    const interestLabel =
      this.interests.find((option) => option.value === payload.interest)?.label ?? payload.interest;

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        name: payload.name,
        business: payload.business || 'No indicada',
        phone: payload.phone,
        email: payload.email,
        interest: interestLabel,
        message: payload.message,
      },
      { publicKey: EMAILJS_PUBLIC_KEY },
    );

    return { ok: true };
  }
}
