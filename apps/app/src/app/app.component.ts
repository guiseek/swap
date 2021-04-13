import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Navigation, NavigationService } from './shared';

@Component({
  selector: 'swap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';

  nav: Navigation;

  @ViewChild('main')
  main: ElementRef<HTMLElement>;

  constructor(private _navigation: NavigationService) {
    const nav = new Navigation('nav', []);
    this._navigation.register(nav);
    this.nav = nav;
  }

  ngAfterViewInit(): void {
    console.log(this.main);
  }

  ngOnInit(): void {
    this.nav.setItems([
      { route: '/auth', label: 'Auth' },
      { route: '/textfield', label: 'Textfield' },
      { route: '/slider', label: 'Slider' },
      { route: '/select', label: 'Select' },
      {
        route: '/',
        label: 'Selecion',
        children: [
          { route: 'radio', label: 'Radio' },
          { route: 'checkbox', label: 'Checkbox' },
        ],
      },
    ]);
  }
}
