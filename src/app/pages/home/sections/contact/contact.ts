import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SectionTitle } from '../../../../shared/components/section-title/section-title';
import { Button } from '../../../../shared/components/button/button';
import { ScrollReveal } from '../../../../shared/directives/scroll-reveal';
import { ContactForm } from '../../../../core/services/contact-form';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, SectionTitle, Button, ScrollReveal],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly contactForm = inject(ContactForm);

  readonly interests = this.contactForm.interests;
  readonly isSubmitting = signal(false);
  readonly submitted = signal(false);
  readonly submitError = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    business: [''],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s()-]{6,20}$/)]],
    email: ['', [Validators.required, Validators.email]],
    interest: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  get f() {
    return this.form.controls;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(false);

    try {
      await this.contactForm.submit(this.form.getRawValue());
      this.submitted.set(true);
      this.form.reset();
    } catch {
      this.submitError.set(true);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
