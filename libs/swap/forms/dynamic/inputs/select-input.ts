import { BaseInput } from './base/base-input';
import { BaseInputParams } from './base/base-input-params';
import { SelectOption } from './select-option';

export class SelectInput extends BaseInput {
  public options: SelectOption[];

  constructor(name: string, options: SelectOption[], params?: BaseInputParams) {
    super(name, params);
    this.options = options;
    this.controlType = 'select';
  }
}
