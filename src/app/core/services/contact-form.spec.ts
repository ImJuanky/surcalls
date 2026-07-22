import { TestBed } from '@angular/core/testing';

import { ContactForm } from './contact-form';

describe('ContactForm', () => {
  let service: ContactForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
