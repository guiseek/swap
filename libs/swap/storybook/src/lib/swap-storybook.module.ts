import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SwapFormsModule } from '@swap/forms';

import { ButtonComponent } from './button/button.component';
import { SelectComponent } from './select/select.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { SliderComponent } from './slider/slider.component';
import { TextfieldComponent } from './textfield/textfield.component';
import { SwapContainer } from './swap.container';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SwapFormsModule],
  declarations: [
    ButtonComponent,
    SelectComponent,
    CheckboxComponent,
    RadioComponent,
    SliderComponent,
    TextfieldComponent,
    SwapContainer,
  ],
})
export class SwapStorybookModule {}
