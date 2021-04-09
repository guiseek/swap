import { SelectPanelComponent } from '../select-panel.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectControlValueAccessor } from '@angular/forms';
import { ElementRef, QueryList } from '@angular/core';
import { OptionComponent } from '../option.component';
import { Option } from './option.interface';

export interface Select extends SelectControlValueAccessor {
  label: string;

  placeholder: string;

  selected: string;

  required: boolean;

  disabled: boolean;

  input: ElementRef<HTMLSelectElement>;

  panel: SelectPanelComponent;

  options: QueryList<OptionComponent>;

  selectedOption: Option;

  displayText: string;

  keyManager: ActiveDescendantKeyManager<Option>;

  onChangeFn: (_: any) => void;

  onTouchedFn: () => void;

  ngAfterContentInit: () => void;

  showPanel: () => void;

  hidePanel: () => void;

  onPanelMenuIconClick: (event: UIEvent) => void;

  onKeyDown: (event: KeyboardEvent) => void;

  selectOption: (option: OptionComponent) => void;

  registerOnChange: (fn: any) => void;

  registerOnTouched: (fn: any) => void;

  setDisabledState: (isDisabled: boolean) => void;

  writeValue: (obj: any) => void;

  // onTouched: () => void;

  // onChange: () => void;
}
