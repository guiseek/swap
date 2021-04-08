import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextfieldContainer } from './textfield.container';

describe('TextfieldContainer', () => {
  let component: TextfieldContainer;
  let fixture: ComponentFixture<TextfieldContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextfieldContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextfieldContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
