import { SwapFormsModule } from '@swap/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { text, number, boolean } from '@storybook/addon-knobs';
import { CheckboxComponent } from './checkbox.component';

export default {
  title: 'CheckboxComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [ReactiveFormsModule, SwapFormsModule],
  },
  component: CheckboxComponent,
  props: {
    label: text('label', 'Checkbox'),
    error: text('error', 'Erro'),
    disabled: text('disabled', ''),
    checked: text('checked', ''),
  },
});
