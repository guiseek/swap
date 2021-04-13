import { Highlightable } from '@angular/cdk/a11y';
import { Select } from './select.interface';

export interface Option extends Highlightable {
  key: string;

  value: string;

  selected: boolean;

  active: boolean;

  select: Select;

  getLabel: () => string;

  setActiveStyles: () => void;

  setInactiveStyles: () => void;

  onClick: (event: UIEvent) => void;
}
