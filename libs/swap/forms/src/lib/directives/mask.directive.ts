import { AbstractControl, NgControl, Validators } from '@angular/forms';
import { unmaskedValueFor, matchAndReplaceFor } from './utilities/mask';
import { maskFormatValidator } from './utilities/mask-validation';
import { startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  ElementRef,
  Directive,
  OnDestroy,
  Optional,
  OnInit,
  Input,
  Self,
} from '@angular/core';
import {
  cursorPositionFor,
  setCursorPositionFor,
  nextCursorPositionFor,
} from './utilities/cursor';

@Directive({
  selector: 'input[swap-mask]',
})
export class MaskDirective implements OnDestroy, OnInit {
  private _destroy = new Subject();

  /**
   * Pode ser inferido com `formControlName` ou` [ngControl] `.
   * O primeiro é necessário se declarado em um wrapper
   * ao invés de um `<input />` el.
   */
  @Input() ngControl!: AbstractControl;

  /**
   * Formatos de máscara, aceita um único ou vários,
   * combinando por pedido. por exemplo, "DDD-WWW.CCC"
   *
   * D: números; C: letras; W: ambos;
   *
   * Todos os outros caracteres são tratados como
   * parte da máscara que acabou de ser exibida.
   * */
  @Input('swap-mask')
  set mask(value: string | string[]) {
    this._mask = Array.isArray(value)
      ? [...value].sort((a, b) => a.length - a.length)
      : value;
  }
  get mask() {
    return this._mask;
  }
  _mask!: string | string[];

  /**
   * Adicione validação para que a entrada corresponda
   * ao comprimento da máscara, senão retorna o erro de
   * validação `invalidLength` no` ngControl`.
   */
  @Input() validateMaskInput = false;

  /** Defina valores claros para o formControl */
  @Input() unmasked = false;

  private previousValue!: string;
  private control!: AbstractControl;
  private nativeEl: any;

  constructor(
    @Optional() @Self() private selfNgControl: NgControl,
    private elRef: ElementRef
  ) {}

  ngOnInit() {
    if (!this.mask) {
      console.warn(
        'WebrMask: Um valor de Máscara é necessário para que a diretiva seja iniciada.'
      );
      return;
    }

    this.control = this.selfNgControl?.control ?? this.ngControl;
    if (!this.control) {
      console.warn(
        'WebrMask: É necessário um FormControl para que a diretiva seja iniciada.'
      );
      return;
    }

    this.nativeEl = this.elRef.nativeElement.hasChildNodes()
      ? this.elRef.nativeElement.getElementsByTagName('input')[0]
      : this.elRef.nativeElement;
    if (!this.nativeEl) {
      console.warn(
        'WebrMask: Um elRef do tipo de entrada é necessário para que a diretiva seja iniciada.'
      );
      return;
    }

    if (this.validateMaskInput) {
      this.control.setValidators([
        Validators.required,
        maskFormatValidator(this.mask),
      ]);
    }

    this.control.valueChanges
      .pipe(startWith(this.control.value), takeUntil(this._destroy))
      .subscribe((value) => this.setValue(this.maskValueFor(value)));
  }

  private setValue(nextValue: string) {
    const nextCursorPosition = nextValue
      ? nextCursorPositionFor(this.nativeEl, this.previousValue, nextValue)
      : cursorPositionFor(this.nativeEl);

    this.previousValue = nextValue;

    this.control.setValue(nextValue, { emitEvent: false });

    if (this.unmasked && nextValue) {
      this.control.setValue(unmaskedValueFor(nextValue), {
        emitEvent: false,
        emitModelToViewChange: false,
      });
    }

    setCursorPositionFor(this.nativeEl, nextCursorPosition);
  }

  private maskValueFor(value: string | number): string {
    if (!value) return '';

    const unmaskedValue = unmaskedValueFor(value);

    const nextMask = !Array.isArray(this.mask)
      ? this.mask
      : this.mask.find(
          (mask) => unmaskedValueFor(mask).length >= unmaskedValue.length
        ) || this.mask[this.mask.length - 1];

    return matchAndReplaceFor(unmaskedValue, nextMask);
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
    this._destroy.unsubscribe();
  }
}
