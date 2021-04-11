import { BaseInput } from '../inputs/base/base-input';
import { META_DATA_KEYS } from '../decorators/meta-data-keys';
import { BaseInputFactory } from '../inputs/base/base-input-factory';
import { FormFieldType } from './form-field-type';
import { SelectOption } from '../inputs/select-option';
import { SwapFormFieldOptions } from '../decorators/swap-form-field-options';
import { BaseInputParams } from '../inputs/base/base-input-params';
import * as _ from 'lodash';

export abstract class SwapFormsModel {
  public getFormFields(): BaseInput[] {
    const inputs: BaseInput[] = [];

    _.forOwn(this, (value, propertyKey: string) => {
      const formFieldOptions: SwapFormFieldOptions = this.getSwapFormFieldMetadata(
        propertyKey
      );
      const required: boolean = this.getSwapFormRequiredMetadata(propertyKey);
      if (formFieldOptions) {
        this.setInputName(formFieldOptions, propertyKey);
        const selectOptions: SelectOption[] = this.buildSelectOptions(
          formFieldOptions,
          value
        );
        inputs.push(
          this.buildBaseInput(
            formFieldOptions,
            value.toString(),
            selectOptions,
            required
          )
        );
      }
    });
    return inputs;
  }

  private buildBaseInput(
    formFieldOptions: SwapFormFieldOptions,
    value: string,
    selectOptions: SelectOption[],
    required: boolean = false
  ) {
    const params: BaseInputParams = this.buildBaseInputParams(
      formFieldOptions,
      selectOptions,
      value,
      required
    );
    return BaseInputFactory.build(
      formFieldOptions.fieldType,
      formFieldOptions.fieldName,
      params
    );
  }

  private hasSelectOptions(formFieldOptions: SwapFormFieldOptions) {
    return (
      formFieldOptions.fieldType === FormFieldType.SELECT ||
      formFieldOptions.fieldType === FormFieldType.RADIO
    );
  }

  private buildSelectOptions(formFieldOptions: SwapFormFieldOptions, value) {
    let selectOptions: SelectOption[];

    if (this.hasSelectOptions(formFieldOptions)) {
      selectOptions = _.map(value, (element) => {
        return new SelectOption(
          element[formFieldOptions.selectOptionKeys.labelKey],
          element[formFieldOptions.selectOptionKeys.valueKey]
        );
      });
    }
    return selectOptions;
  }

  private buildBaseInputParams(
    formFieldOptions: SwapFormFieldOptions,
    selectOptions: SelectOption[],
    value: string,
    required: boolean
  ): BaseInputParams {
    const params: BaseInputParams = this.hasSelectOptions(formFieldOptions)
      ? { selectOptions: selectOptions }
      : { value: value };

    params.required = required;
    params.disabled = formFieldOptions.disabled;
    params.placeholder = formFieldOptions.placeholder;
    return params;
  }

  private setInputName(
    formFieldOptions: SwapFormFieldOptions,
    propertyKey: string
  ) {
    _.set(formFieldOptions, 'fieldName', propertyKey);
  }

  private getSwapFormRequiredMetadata(propertyKey: string): boolean {
    return _.get(this, META_DATA_KEYS.SWAP_FORM_FIELD_REQUIRED, propertyKey);
  }

  private getSwapFormFieldMetadata(propertyKey: string): SwapFormFieldOptions {
    return _.get(this, META_DATA_KEYS.SWAP_FORM_FIELD + '.' + propertyKey);
  }
}
