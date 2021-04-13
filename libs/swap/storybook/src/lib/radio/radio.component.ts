import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'storybook-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent {
  control = new FormControl(2);

  @Input() label: string = 'Radio';

  @Input() set value(value: string) {
    this.control.setValue(value);
  }

  @Input() set disabled(value: boolean) {
    if (value) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
