import { text, number, boolean } from '@storybook/addon-knobs';
import { SliderComponent } from './slider.component';

export default {
  title: 'SliderComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: SliderComponent,
  props: {
    label: text('label', 'Slider'),
    value: text('value', ''),
    disabled: text('disabled', ''),
  }
})