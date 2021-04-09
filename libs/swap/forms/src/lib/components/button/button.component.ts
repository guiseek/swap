import {
  Input,
  Component,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';

export type StyleMode = 'primary' | 'secondary';

@Component({
  selector: 'button[swap-button]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  private _mode: StyleMode = 'primary';

  @Input()
  @HostBinding('attr.mode')
  get mode(): StyleMode {
    return this._mode;
  }

  set mode(style: StyleMode) {
    this._mode = style;
  }
}
