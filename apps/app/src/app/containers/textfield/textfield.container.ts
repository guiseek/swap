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
    cpf: ['', [Validators.required]],
    phone: ['', [Validators.minLength(15)]],
    price: ['', [Validators.min(0.01)]],
  });

  constructor(readonly fb: FormBuilder) {}
}
