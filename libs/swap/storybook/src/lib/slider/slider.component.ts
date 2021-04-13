import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'storybook-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['../swap.container.scss'],
})
export class SliderComponent {
  control = new FormControl(25);

  @Input() label: string = 'Slider';

  @Input() set value(value: number) {
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
