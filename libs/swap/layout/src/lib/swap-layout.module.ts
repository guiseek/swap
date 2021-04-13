import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsContainer } from './tabs/tabs.container';
import { TabComponent } from './tabs/tab.component';
import { NavFocusDirective } from './directives/nav-focus.directive';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [TabsContainer, TabComponent, NavFocusDirective],
  exports: [TabsContainer, TabComponent, NavFocusDirective],
})
export class SwapLayoutModule {}
