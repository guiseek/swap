import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TextfieldComponent,
  CheckboxComponent,
  RadioComponent,
  SliderComponent,
  ButtonComponent,
} from './components';
import {
  ControlDirective,
  CurrencyMaskDirective,
  MaskDirective,
} from './directives';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TextfieldComponent,
    ControlDirective,
    MaskDirective,
    CurrencyMaskDirective,
    CheckboxComponent,
    RadioComponent,
    SliderComponent,
    ButtonComponent,
  ],
  exports: [
    TextfieldComponent,
    ControlDirective,
    MaskDirective,
    CurrencyMaskDirective,
    CheckboxComponent,
    RadioComponent,
    SliderComponent,
    ButtonComponent,
  ],
})
export class SwapFormsModule {}
