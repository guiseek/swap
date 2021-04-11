import { BaseInput } from './base-input';
import { TextInput } from '../text-input';
import { BaseInputParams } from './base-input-params';
import { TextAreaInput } from '../text-area-input';
import { SelectInput } from '../select-input';
import { CheckboxInput } from '../checkbox-input';
import { RadioInput } from '../radio-input';
import { InputTypes } from './input-types';

export class BaseInputFactory {
  public static build(
    fieldType: string,
    fieldName: string,
    params?: BaseInputParams
  ): BaseInput {
    switch (fieldType) {
      case InputTypes.TextInput:
        return new TextInput(fieldName, params);
      case InputTypes.CheckboxInput:
        return new CheckboxInput(fieldName, params);
      case InputTypes.TextAreaInput:
        return new TextAreaInput(fieldName, params);
      case InputTypes.SelectInput:
        return new SelectInput(fieldName, params.selectOptions, params);
      case InputTypes.RadioInput:
        return new RadioInput(fieldName, params.selectOptions, params);
    }
  }
}
