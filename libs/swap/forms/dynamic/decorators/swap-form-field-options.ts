import { FormFieldType } from '../models/form-field-type';

export interface SwapFormFieldOptions {
  fieldType: FormFieldType;
  fieldName?: string;
  disabled?: boolean;
  placeholder?: string;
  selectOptionKeys?: { labelKey: string; valueKey: string };
  validator?: any;
}
