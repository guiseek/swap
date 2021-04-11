import { BaseInput } from './base/base-input';
import { BaseInputParams } from './base/base-input-params';

export class CheckboxInput extends BaseInput {
  constructor(name: string, inputParams?: BaseInputParams) {
    super(name, inputParams);
    this.controlType = 'checkbox';
  }
}
