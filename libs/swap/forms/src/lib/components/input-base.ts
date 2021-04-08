import { ControlDirective } from '../directives';
import { ContentChild, Directive } from '@angular/core';

@Directive()
export class InputBase {
  @ContentChild(ControlDirective) public input: ControlDirective;

  // prettier-ignore
  get showError() {
    return this.input.ngControl.invalid
        && this.input.ngControl.touched;
  }
}
