import { Directive, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[swap-control],[swapControl]',
})
export class ControlDirective {
  @HostBinding('attr.placeholder')
  readonly placeholderSpace = ' '

  constructor(public ngControl: NgControl) {}
}
