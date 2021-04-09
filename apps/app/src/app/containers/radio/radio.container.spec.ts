import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioContainer } from './radio.container';

describe('RadioContainer', () => {
  let component: RadioContainer;
  let fixture: ComponentFixture<RadioContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
