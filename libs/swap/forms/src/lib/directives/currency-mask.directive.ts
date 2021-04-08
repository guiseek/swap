import { startWith, takeUntil, filter, tap, map } from 'rxjs/operators';
import { AbstractControl, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  AfterViewInit,
  ElementRef,
  Directive,
  OnDestroy,
  Optional,
  Input,
  Self,
} from '@angular/core';
import {
  maskedNumericValueFor,
  unmaskedNumericValueFor,
  hasNonDecimalCharacters,
} from './utilities/mask';
import {
  nextCursorPositionFor,
  setCursorPositionFor,
  cursorPositionFor,
} from './utilities/cursor';

@Directive({ selector: 'input[swap-currency]' })
export class CurrencyMaskDirective implements OnDestroy, AfterViewInit {
  private _destroy = new Subject();
  /**
   * pode ser inferido com `formControlName` ou` [ngControl]`.
   * O primeiro é necessário se declarado em um wrapper em
   * vez de um `<input />` el.
   */
  @Input() ngControl!: AbstractControl;

  @Input() prefix = 'R$';
  @Input() thousandsSeparator = '.';
  @Input() decimalSeparator = ',';
  @Input() digitsAfterSeparator = 2;
  @Input() maxIntegerDigits = 8;
  @Input() allowNegatives = false;

  /**
   * Para quando o formulário já tem um valor inicial
   * ou espera-se que inicialize como `zero * mascarado *`.
   */
  @Input() validateOnInit = true;

  private valueHasChanged = false;
  private previousValue!: string;
  private control!: AbstractControl;
  private nativeEl: any;

  constructor(
    @Optional() @Self() private selfNgControl: NgControl,
    private elRef: ElementRef
  ) {
    if (this.selfNgControl?.control) {
      this.ngControl = this.selfNgControl?.control;
    }
  }

  ngAfterViewInit() {
    this.control = this.selfNgControl?.control ?? this.ngControl;
    if (!this.control) {
      console.warn(`
        currencyMask: Um FormControl é necessário
        para que a diretiva seja iniciada.
      `);
      return;
    }
    const element = this.elRef.nativeElement;
    this.nativeEl = element.hasChildNodes()
      ? element.getElementsByTagName('input')[0]
      : element;
    if (!this.nativeEl) {
      console.warn(`
        currencyMask: um elRef do tipo input é
        necessário para que a diretiva seja iniciada.
      `);
      return;
    }

    const boot = this.validateOnInit
      ? startWith(this.control.value as string)
      : tap(() => {});

    this.control.valueChanges
      .pipe(
        filter((value: string | number) => {
          const lastValueWasChanged = this.valueHasChanged;
          this.valueHasChanged = false;

          return (
            !this.previousValue ||
            unmaskedNumericValueFor(value) !==
              unmaskedNumericValueFor(this.previousValue) ||
            hasNonDecimalCharacters(value) ||
            !lastValueWasChanged
          );
        }),
        map((value: string | number) => value?.toString() ?? ''),
        takeUntil(this._destroy)
      )
      .subscribe((value: string) => {
        this.adjustCursorIfSeparator(value);
        this.setValue(
          this.maskedValueFor(value),
          value.length < this.previousValue?.length
        );
      });
  }

  private setValue(nextValue: string, removing = false) {
    let nextCursorPosition = cursorPositionFor(this.nativeEl);

    if (nextValue) {
      nextCursorPosition =
        nextCursorPosition <= this.prefix.length + 1
          ? nextValue.length
          : nextCursorPositionFor(
              this.nativeEl,
              this.previousValue,
              nextValue,
              true,
              true,
              removing
            );
    }

    const wasInitialValue = this.valueHasChanged;

    this.valueHasChanged = !!this.previousValue;
    this.previousValue = nextValue;

    this.control.setValue(nextValue, { emitEvent: false });
    this.control.setValue(unmaskedNumericValueFor(nextValue), {
      emitEvent: true,
      emitModelToViewChange: false,
    });

    if (wasInitialValue) {
      nextCursorPosition = nextValue.length + 1;
    }

    setCursorPositionFor(this.nativeEl, nextCursorPosition);
  }

  private maskedValueFor(value: string): string {
    return maskedNumericValueFor(
      value,
      this.thousandsSeparator,
      this.decimalSeparator,
      this.prefix,
      this.digitsAfterSeparator,
      this.maxIntegerDigits,
      this.allowNegatives
    );
  }

  private adjustCursorIfSeparator(value: string) {
    const decimalSeparatorPressed =
      value.indexOf(this.decimalSeparator) !==
      value.lastIndexOf(this.decimalSeparator);

    if (decimalSeparatorPressed) {
      const curPos = cursorPositionFor(this.elRef);
      const nextPos =
        curPos - 1 <= value.indexOf(this.decimalSeparator)
          ? value.length
          : value.indexOf(this.decimalSeparator) + 1;

      setCursorPositionFor(this.elRef, nextPos);
    }
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
    this._destroy.unsubscribe();
  }
}
