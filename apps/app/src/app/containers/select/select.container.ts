import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './select.container.html',
})
export class SelectContainer implements OnInit {
  options: { value: number; label: string }[] = [
    { value: 1, label: 'Paris' },
    { value: 2, label: 'Brasil' },
    { value: 3, label: 'Singapore' },
    { value: 4, label: 'Malaysia' },
    { value: 5, label: 'Goa' },
    { value: 6, label: 'Thailand' },
  ];

  form = this.fb.group({
    control: ['', []],
    populated: ['', []],
    required: ['', [Validators.required]],
  });

  constructor(readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.get('populated').patchValue({ value: 6, label: 'Thailand' });
  }
}
