import { BaseInputParams } from './base/base-input-params';
import { SelectOption } from './select-option';
import { SelectInput } from './select-input';

export class RadioInput extends SelectInput {
  constructor(name: string, options: SelectOption[], params?: BaseInputParams) {
    super(name, options, params);
    this.options = options;
    this.controlType = 'radio';
  }
}
