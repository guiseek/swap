import { TabsContainer } from './tabs.container';
import {
  Input,
  Component,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'swap-tab',
  template: `
    <div class="tabs__panel">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  @Input() active: boolean = false;
  @Input() tabTitle: string = '';

  @HostBinding('attr.aria-hidden')
  get hidden() {
    return !this.active;
  }

  constructor(tabs: TabsContainer) {
    tabs.addTab(this);
  }
  getTabTitle() {
    return this.tabTitle;
  }
}
