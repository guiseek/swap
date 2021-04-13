export function maskedNumericValueFor(
  value: string | number = '',
  thousandSeparator = ' ',
  decimalSeparator = '.',
  prefix = '',
  digitsAfterSeparator = 2,
  maxDigits = 12,
  allowNegatives = true
): string {
  const isNegative = allowNegatives && String(value).match(/-/g)?.length === 1;

  let baseValue = unmaskedNumericValueFor(value, true);
  baseValue =
    (baseValue.length >= 1 && String(parseInt(baseValue, 10))) || '000';

  const integerLength = baseValue.length - digitsAfterSeparator;
  const cents = baseValue
    .substr((integerLength > 0 && integerLength) || 0)
    .padStart(digitsAfterSeparator, '0');

  let integerValue = baseValue
    .substring(
      0,
      baseValue.length - digitsAfterSeparator > maxDigits
        ? maxDigits
        : baseValue.length - digitsAfterSeparator
    )
    .padStart(1, '0');

  if (thousandSeparator)
    integerValue = integerValue.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      thousandSeparator
    );

  return `${prefix ? `${prefix} ` : ''}${
    isNegative ? '-' : ''
  }${integerValue}${decimalSeparator}${cents}`;
}

export function unmaskedNumericValueFor(
  value: string | number,
  removeNegative = false
): string {
  return removeNegative
    ? String(value).replace(/[^0-9]+/g, '')
    : String(value).replace(/[^0-9-]+/g, '');
}

export function unmaskedValueFor(value: string | number): string {
  return String(value).replace(/[^\w]+/g, '');
}

export function hasNonDecimalCharacters(value: string | number): boolean {
  return !/^-?\d+$/.test(String(value));
}

export function matchAndReplaceFor(text: string, pattern: string): string {
  let patternOffset = 0;

  const testPositionFunc = (
    prevText: string,
    cur: string,
    i: number
  ): string => {
    switch (pattern[i + patternOffset]) {
      case 'D':
        if (/[\d]/.test(cur)) return `${prevText}${cur}`;
        break;
      case 'C':
        if (/[\A-Z, a-z]/.test(cur)) return `${prevText}${cur}`;
        break;
      case 'W':
        if (/[\w]/.test(cur)) return `${prevText}${cur}`;
        break;
      default: {
        if (/[^\w]/.test(pattern[i + patternOffset])) {
          patternOffset++;
          return testPositionFunc(
            `${prevText}${pattern[i + patternOffset - 1]}`,
            cur,
            i
          );
        }
      }
    }

    patternOffset--;
    return `${prevText}`;
  };

  return text.split('').reduce(testPositionFunc, '');
}
