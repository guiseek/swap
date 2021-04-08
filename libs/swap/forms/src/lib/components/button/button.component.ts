import { Component, HostBinding, Input } from '@angular/core';

export type StyleMode = 'primary' | 'secondary';

@Component({
  selector: 'button[swap-button]',
  template: '<ng-content></ng-content>',
})
export class ButtonComponent {
  @Input()
  @HostBinding('attr.mode')
  get mode(): StyleMode {
    return this._mode;
  }

  set mode(style: StyleMode) {
    this._mode = style;
  }

  private _mode: StyleMode = 'primary';
}
