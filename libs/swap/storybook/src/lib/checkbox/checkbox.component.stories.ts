import { text, number, boolean } from '@storybook/addon-knobs';
import { CheckboxComponent } from './checkbox.component';

export default {
  title: 'CheckboxComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: CheckboxComponent,
  props: {
    label: text('label', 'Checkbox'),
    error: text('error', 'Erro'),
    disabled: text('disabled', ''),
    checked: text('checked', ''),
  }
})