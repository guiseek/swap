import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputBase } from './../input-base';

@Component({
  selector: 'label[swap-radio]',
  templateUrl: '../template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent extends InputBase {}
