import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  templateUrl: './checkbox.container.html',
})
export class CheckboxContainer {
  form = this.fb.group({
    one: [true, [Validators.requiredTrue]],
    two: [false, [Validators.requiredTrue]]
  });

  constructor(readonly fb: FormBuilder) {}
}
