import { FormControl, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  templateUrl: './slider.container.html',
})
export class SliderContainer {
  form = this.fb.group({
    control: new FormControl(59),
  });

  constructor(readonly fb: FormBuilder) {}
}
