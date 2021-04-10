import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsContainer } from './tabs/tabs.container';
import { TabComponent } from './tabs/tab.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TabsContainer, TabComponent],
  exports: [TabsContainer, TabComponent],
})
export class SwapLayoutModule {}
