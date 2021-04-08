import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxContainer } from './checkbox.container';

describe('CheckboxContainer', () => {
  let component: CheckboxContainer;
  let fixture: ComponentFixture<CheckboxContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
