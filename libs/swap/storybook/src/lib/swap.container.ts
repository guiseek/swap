import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'storybook-swap',
  template: '<ng-content></ng-content>',
  styleUrls: ['./swap.container.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SwapContainer {}
