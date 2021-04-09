import { Component, OnInit } from '@angular/core';
import { Navigation, NavigationService } from './shared';

@Component({
  selector: 'swap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'app';

  nav: Navigation;

  constructor(private _navigation: NavigationService) {
    const nav = new Navigation('nav', []);
    this._navigation.register(nav);
    this.nav = nav;
  }

  ngOnInit(): void {
    this.nav.setItems([
      { route: '/textfield', label: 'TextField' },
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
