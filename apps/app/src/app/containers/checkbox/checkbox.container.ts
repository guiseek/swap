import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './checkbox.container.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxContainer {
  form = this.fb.group({
    one: [true, [Validators.requiredTrue]],
    two: [false, [Validators.requiredTrue]],
    group: this.fb.group({
      c1: [true],
      c2: [false],
      c3: [true],
      c4: [false],
      c5: [true],
      c6: [false],
    }),
  });

  constructor(readonly fb: FormBuilder) {}

  getState(group: FormGroup) {
    const values = Object.values(group.controls);
    const some = values.some((control) => control.value);
    const all = values.every((control) => control.value);
    return all ? all : some ? null : !!some;
  }

  toggleGroup(checked: boolean, group: FormGroup) {
    Object.values(group.controls).map((c) => c.setValue(checked));
  }
}
