import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsContainer } from './tabs/tabs.container';
import { TabComponent } from './tabs/tab.component';
import { TabNextDirective } from './tabs/tab-next.directive';
import { TabPrevDirective } from './tabs/tab-prev.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TabsContainer, TabComponent, TabNextDirective, TabPrevDirective],
  exports: [TabsContainer, TabComponent, TabNextDirective, TabPrevDirective],
})
export class SwapLayoutModule {}
