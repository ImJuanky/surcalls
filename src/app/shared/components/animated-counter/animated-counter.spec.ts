import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedCounter } from './animated-counter';

describe('AnimatedCounter', () => {
  let component: AnimatedCounter;
  let fixture: ComponentFixture<AnimatedCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedCounter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedCounter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
