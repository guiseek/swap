export class LabelValueKeysNotDefinedException extends Error {
  constructor() {
    super('labelValueKeys are not defined for SwapFormField of type Select');
  }
}
