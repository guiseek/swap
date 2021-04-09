import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[swapTabPrev]',
})
export class TabPrevDirective {
  @Output() swapTabPrev = new EventEmitter<void>();
}
