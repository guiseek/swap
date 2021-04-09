import { text, number, boolean } from '@storybook/addon-knobs';
import { RadioComponent } from './radio.component';

export default {
  title: 'RadioComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: RadioComponent,
  props: {
    label: text('label', 'Radio'),
    value: text('value', ''),
    disabled: text('disabled', ''),
  }
})