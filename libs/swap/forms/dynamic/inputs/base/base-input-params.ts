import { InputControlType } from '../input-control-type';
import { SelectOption } from '../select-option';

export interface BaseInputParams {
  label?: string;
  value?: string;
  selectOptions?: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  order?: number;
  controlType?: InputControlType;
}
