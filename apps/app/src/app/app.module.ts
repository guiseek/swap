import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SwapFormsModule } from '@swap/forms';

import { AppComponent } from './app.component';
import {
  TextfieldContainer,
  CheckboxContainer,
  RadioContainer,
  SliderContainer,
} from './containers';

const routes: Routes = [
  { path: '', redirectTo: 'textfield', pathMatch: 'full' },
  { path: 'textfield', component: TextfieldContainer },
  { path: 'checkbox', component: CheckboxContainer },
  { path: 'radio', component: RadioContainer },
  { path: 'slider', component: SliderContainer },
];

@NgModule({
  declarations: [
    AppComponent,
    TextfieldContainer,
    CheckboxContainer,
    RadioContainer,
    SliderContainer,
  ],
  imports: [
    BrowserModule,
    SwapFormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
