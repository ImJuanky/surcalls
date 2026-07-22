import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiVoiceAgents } from './ai-voice-agents';

describe('AiVoiceAgents', () => {
  let component: AiVoiceAgents;
  let fixture: ComponentFixture<AiVoiceAgents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiVoiceAgents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiVoiceAgents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
