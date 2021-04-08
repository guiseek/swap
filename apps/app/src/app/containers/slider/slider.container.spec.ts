import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderContainer } from './slider.container';

describe('SliderContainer', () => {
  let component: SliderContainer;
  let fixture: ComponentFixture<SliderContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
