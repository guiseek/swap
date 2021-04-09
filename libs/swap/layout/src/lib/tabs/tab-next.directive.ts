import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[swapTabNext]',
})
export class TabNextDirective {
  @HostListener('click') onClick() {
    this.swapTabNext.emit();
  }
  @Output() swapTabNext = new EventEmitter<void>();
}
