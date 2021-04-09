import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'storybook-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  control = new FormControl(false, [Validators.requiredTrue]);

  @Input() label: string = 'Checkbox';

  @Input() error: string = 'Erro';

  @Input() set disabled(value: boolean) {
    if (value) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  @Input() set checked(value: boolean) {
    this.control.setValue(value);
  }
}
