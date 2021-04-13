import { filter } from 'rxjs/operators';
import { Directive, ElementRef, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Directive({
  selector: '[swap-nav-focus]',
})
export class NavFocusDirective {
  private _mainHeader!: HTMLElement;
  get mainHeader(): HTMLElement {
    return this._mainHeader;
  }

  @Input('main-header')
  set mainHeader(el: HTMLElement) {
    console.log(el);

    this._mainHeader = el;
  }

  constructor(readonly router: Router) {
    console.log(this.mainHeader);
    router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        // const mainHeader = document.querySelector('#main-content-header');
        const mainHeader = this.mainHeader;
        mainHeader.addEventListener('focus', console.log)
        console.log(mainHeader);
        if (mainHeader) {
          mainHeader.focus();
        }
      });
  }
}
