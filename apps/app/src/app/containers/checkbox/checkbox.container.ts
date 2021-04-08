import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  templateUrl: './checkbox.container.html',
  styleUrls: ['./checkbox.container.scss'],
})
export class CheckboxContainer {
  form = this.fb.group({
    one: [true, [Validators.required]],
    two: ['', [Validators.required]]
  });

  constructor(readonly fb: FormBuilder) {}

  ngOnInit(): void {}
}
