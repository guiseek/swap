import { FormControl, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  templateUrl: './radio.container.html',
})
export class RadioContainer {
  form = this.fb.group({
    control: new FormControl(2),
  });

  constructor(readonly fb: FormBuilder) {}
}
