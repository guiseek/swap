import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SwapLayoutModule } from '@swap/layout';
import { SwapFormsModule } from '@swap/forms';

import { AppComponent } from './app.component';
import { FormFooterComponent, HeaderNavComponent } from './components';
import { NavigationService } from './shared';
import {
  TextfieldContainer,
  CheckboxContainer,
  RadioContainer,
  SliderContainer,
  SelectContainer,
} from './containers';

const routes: Routes = [
  { path: '', redirectTo: 'textfield', pathMatch: 'full' },
  { path: 'textfield', component: TextfieldContainer },
  { path: 'checkbox', component: CheckboxContainer },
  { path: 'radio', component: RadioContainer },
  { path: 'slider', component: SliderContainer },
  { path: 'select', component: SelectContainer },
];

@NgModule({
  declarations: [
    AppComponent,
    FormFooterComponent,
    TextfieldContainer,
    CheckboxContainer,
    RadioContainer,
    SliderContainer,
    HeaderNavComponent,
    SelectContainer,
  ],
  imports: [
    BrowserModule,
    SwapFormsModule,
    SwapLayoutModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [NavigationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
