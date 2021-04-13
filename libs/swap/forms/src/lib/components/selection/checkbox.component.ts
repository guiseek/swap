import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputBase } from './../input-base';

@Component({
  selector: 'label[swap-checkbox]',
  templateUrl: '../template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends InputBase {}
