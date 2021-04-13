import {
  Input,
  Output,
  Component,
  EventEmitter,
  AfterContentInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'swap-tabs',
  exportAs: 'swapTabs',
  templateUrl: './tabs.container.html',
  styleUrls: ['./tabs.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsContainer implements AfterContentInit {
  _disabled!: boolean;

  get disabled() {
    return this._disabled;
  }
  @Input() set disabled(value: boolean) {
    this._disabled = value;
  }

  @Output() currentTabChange = new EventEmitter<TabComponent>();

  ifTabSelected: boolean = false;
  tabs: TabComponent[] = [];

  addTab(tab: TabComponent) {
    this.tabs.push(tab);
  }

  selectTab(tab: TabComponent) {
    this.tabs.forEach((tab) => (tab.active = false));
    this.currentTabChange.emit(tab);
    tab.active = true;
  }

  ngAfterContentInit() {
    this.tabs.forEach((tab) => {
      if (tab.active) {
        this.selectTab(tab);
        this.ifTabSelected = true;
      }
    });
    if (!this.ifTabSelected) {
      this.selectTab(this.tabs[0]);
    }
  }
}
