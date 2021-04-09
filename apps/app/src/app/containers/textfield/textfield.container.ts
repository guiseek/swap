import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  templateUrl: './textfield.container.html',
})
export class TextfieldContainer {
  form = this.fb.group({
    filled: ['', [Validators.required]],
    outlined: ['', [Validators.required]],
    standard: ['', [Validators.required]],
  });

  constructor(readonly fb: FormBuilder) {}
}
