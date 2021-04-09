import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  TextfieldComponent,
  CheckboxComponent,
  RadioComponent,
  SliderComponent,
  ButtonComponent,
  SelectComponent,
  OptionComponent,
  SelectPanelComponent,
} from './components';
import {
  ControlDirective,
  CurrencyMaskDirective,
  MaskDirective,
} from './directives';

@NgModule({
  imports: [CommonModule, OverlayModule, PortalModule],
  declarations: [
    TextfieldComponent,
    ControlDirective,
    MaskDirective,
    CurrencyMaskDirective,
    CheckboxComponent,
    RadioComponent,
    SliderComponent,
    ButtonComponent,
    SelectComponent,
    SelectPanelComponent,
    OptionComponent,
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
    SelectComponent,
    SelectPanelComponent,
    OptionComponent,
  ],
})
export class SwapFormsModule {}
