import { NavigationService, Navigation, NavigationItem } from './../../shared';
import {
  Input,
  Component,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'nav[swap-header]',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderNavComponent {
  @Input('swap-header')
  public header = '';

  @HostBinding('attr.role')
  role = 'navigation';

  readonly nav: Navigation;
  constructor(readonly navigation: NavigationService) {
    this.nav = this.navigation.get('nav');
  }

  toggle(item: NavigationItem) {
    item.expanded = !item.expanded;
  }
}
