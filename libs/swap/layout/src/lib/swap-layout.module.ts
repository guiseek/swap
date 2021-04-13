import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsContainer, TabComponent } from './components';
import { NavFocusDirective } from './directives';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [TabsContainer, TabComponent, NavFocusDirective],
  exports: [TabsContainer, TabComponent, NavFocusDirective],
})
export class SwapLayoutModule {}
