import { FormGroup, FormGroupName } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  OnInit,
  OnDestroy,
  Directive,
  Renderer2,
  ElementRef,
  HostListener,
} from '@angular/core';

type CheckboxGroupValue = Record<string, boolean>;
type CheckboxGroupState = 'checked' | 'indeterminate';

@Directive({ selector: 'input[swap-checkbox-group]' })
export class CheckboxGroupDirective implements OnInit, OnDestroy {
  /**
   * Usado para manter o observable ativo
   * enquanto temos ciclo de vida do componente
   *
   * @private
   */
  private destroy = new Subject<void>();

  /**
   * Usado para manter o último estado misto
   * em memória para retorno posterior
   *
   * @type {CheckboxGroupValue}
   */
  lastState: CheckboxGroupValue = null;

  /**
   * Cria uma instância para CheckboxGroupDirective
   *
   * @param {ElementRef<HTMLElement>} element
   * @param {Renderer2} renderer
   * @param {FormGroupName} container
   */
  constructor(
    private element: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private container: FormGroupName
  ) {}

  /**
   * Checkboxes controlados
   *
   * A partir de alterações individuais nos checkboxes
   * alteramos o estado do controlador para quando:
   *
   * - Todos marcados: marcado
   * - Todos desmarcados: desmarcado
   * - Partialmente marcados: indeterminado / Misto
   */
  ngOnInit(): void {
    this.checkState(this.container.value);

    this.container.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((value: CheckboxGroupValue) => this.checkState(value));
  }

  /**
   * Checkbox controlador
   *
   * Escutando alterações do checkbox controlador
   * é possível manter em memória o estado inicial dos
   * checkboxes controlados para alternar entre os estados
   * marcados / desmarcados, então retornar ao estado inicial.
   *
   * @param {HTMLInputElement} { checked }
   */
  @HostListener('change', ['$event.target'])
  onChange({ checked }: HTMLInputElement) {
    this.updateProperty('indeterminate', false);

    if (this.lastState && !checked) {
      this.toggleGroup(this.container.control, checked);
      return;
    }

    if (!this.lastState && checked) {
      this.lastState = this.container.value;
      this.toggleGroup(this.container.control, checked);
      return;
    }

    this.container.control.patchValue(this.lastState);
    this.lastState = null;
  }

  /**
   * Percorre checkboxes alterando seus estados
   *
   * @param {FormGroup} group
   * @param {boolean} checked
   */
  public toggleGroup(group: FormGroup, checked: boolean) {
    Object.values(group.controls).map((c) => c.setValue(checked));
  }

  /**
   * Altera o estado do controlador baseado em
   * valores contidos nos checkboxes controlados
   *
   * @private
   * @param {CheckboxGroupValue} value
   */
  private checkState(value: CheckboxGroupValue) {
    const checked = this.getState(value);
    this.updateProperty('checked', checked || false);
    this.updateProperty('indeterminate', checked === null);
  }

  /**
   * Analisa checkboxes para determinar se todos
   * estão marcados, desmarcados ou misto, retornando:
   *
   * - Todos marcados: true
   * - Todos desmarcados: false
   * - Misto: null
   *
   * @private
   * @param {CheckboxGroupValue} value
   */
  private getState(value: CheckboxGroupValue) {
    const values = Object.values(value);
    const some = values.some((value) => value);
    const every = values.every((value) => value);
    return every ? every : some ? null : some;
  }

  /**
   * Altera o atributo do elemento no dom
   *
   * @private
   * @internal
   * @param {CheckboxGroupState} property
   * @param {boolean} value
   */
  private updateProperty(
    property: CheckboxGroupState,
    value: boolean
  ) {
    this.renderer.setProperty(this.element.nativeElement, property, value);
  }

  /**
   * Completa o subject e finaliza o observable
   *
   * @internal
   */
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
