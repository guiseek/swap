import { LabelValueKeysNotDefinedException } from '../exceptions/label-value-keys-not-defined-exception';
import { SwapFormFieldOptions } from './swap-form-field-options';
import { FormFieldType } from '../models/form-field-type';
import { META_DATA_KEYS } from './meta-data-keys';
import * as _ from 'lodash';
import 'reflect-metadata';

/**
 * Adds metadata to decorated Class field
 */

export function SwapFormField(
  options: SwapFormFieldOptions
): (target: any, propertyKey: string) => void {
  if (hasNoRequiredFields(options)) {
    throw new LabelValueKeysNotDefinedException();
  }

  return (target: any, propertyKey: string) => {
    let metadata = _.setWith({}, propertyKey, options);
    if (_.hasIn(target, META_DATA_KEYS.SWAP_FORM_FIELD)) {
      metadata = _.get(target, META_DATA_KEYS.SWAP_FORM_FIELD);
      metadata[propertyKey] = options;
    }
    _.setWith(target, META_DATA_KEYS.SWAP_FORM_FIELD, metadata);
  };
}

function hasNoRequiredFields(options: SwapFormFieldOptions) {
  return (
    (options.fieldType === FormFieldType.SELECT && !options.selectOptionKeys) ||
    (options.fieldType === FormFieldType.RADIO && !options.selectOptionKeys)
  );
}
