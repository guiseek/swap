import { FormControl, Validators } from '@angular/forms';
import { BaseInputParams } from './base-input-params';
import { InputControlType } from '../input-control-type';

export class BaseInput {
  public value: any;
  public name: string;
  public label: string;
  public placeholder: string;
  public required: boolean;
  public disabled: boolean;
  public order: number;
  public options: any[];
  public controlType: InputControlType;
  private formControl: FormControl;

  constructor(name: string, inputParams?: BaseInputParams) {
    this.name = name;
    if (inputParams) {
      this.label = inputParams.label;
      this.required = inputParams.required;
      this.disabled = inputParams.disabled;
      this.order = inputParams.order;
      this.placeholder = inputParams.placeholder;
      this.controlType = inputParams.controlType;
      this.value = inputParams.value;
    }

    this.formControl = this.buildFormControl();
  }

  public getFormControl(): FormControl {
    return this.formControl;
  }

  private buildFormControl(): FormControl {
    return this.required
      ? new FormControl(
          { value: this.value, disabled: this.disabled } || '',
          Validators.required
        )
      : new FormControl({ value: this.value, disabled: this.disabled } || '');
  }
}
