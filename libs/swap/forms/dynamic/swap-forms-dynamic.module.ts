import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './components/dynamic-form.component';
import { DynamicInputComponent } from './components/dynamic-input.component';

import 'reflect-metadata';

/**
 * @version beta
 * @since 10/04/2021
 */
@NgModule({
  imports: [FormsModule, BrowserModule, ReactiveFormsModule],
  declarations: [DynamicFormComponent, DynamicInputComponent],
  exports: [DynamicFormComponent, DynamicInputComponent],
})
export class SwapFormsDynamicModule {}
