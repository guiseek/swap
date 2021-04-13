import { text, number, boolean } from '@storybook/addon-knobs';
import { RadioComponent } from './radio.component';
import { SwapFormsModules } from '../swap-forms-modules';

export default {
  title: 'RadioComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: SwapFormsModules,
  },
  component: RadioComponent,
  props: {
    label: text('label', 'Radio'),
    value: text('value', ''),
    disabled: text('disabled', ''),
  },
});
