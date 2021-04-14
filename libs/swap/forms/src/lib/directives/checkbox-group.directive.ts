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

@Directive({
  selector: 'input[swap-checkbox-group]',
})
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
   * @private
   * @type {Record<string, boolean>}
   */
  private lastState: Record<string, boolean> = null;

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
    if (this.container?.control) {
      this.container.valueChanges
        .pipe(takeUntil(this.destroy))
        .subscribe((value: Record<string, boolean>) => {
          const checked = this.getState(value);
          this.updateProperty('checked', checked || false);
          this.updateProperty('indeterminate', checked === null);
        });
    }
  }

  /**
   * Checkbox controlador
   *
   * Escutando alterações do checkbox controlador
   * é possível manter em memória o estado inicial dos
   * checkboxes controlados para alternar entre os estados
   * marcados / desmarcados, então retornar ao estado inicial.
   */
  @HostListener('change', ['$event.target'])
  onChange({ checked }: HTMLInputElement) {
    this.updateProperty('indeterminate', false);

    if (this.container?.control) {
      if (!this.lastState && checked) {
        this.lastState = this.container.value;
        this.toggleGroup(this.container.control, checked);
      } else {
        if (this.lastState && !checked) {
          this.toggleGroup(this.container.control, checked);
        } else {
          this.container.control.patchValue(this.lastState);
          this.lastState = null;
        }
      }
    }
  }

  /**
   * Percorre checkboxes alterando seus estados
   *
   * @param {FormGroup} group
   * @param {boolean} checked
   */
  toggleGroup(group: FormGroup, checked: boolean) {
    Object.values(group.controls).map((c) => c.setValue(checked));
  }

  /**
   * Analisa checkboxes para determinar se todos
   * estão marcados, desmarcados ou misto, retornando:
   *
   * - Todos marcados: true
   * - Todos desmarcados: false
   * - Misto: null
   *
   * @param {Record<string, boolean>} value
   */
  getState(value: Record<string, boolean>) {
    const values = Object.values(value);
    const some = values.some((value) => value);
    const all = values.every((value) => value);
    return all ? all : some ? null : !!some;
  }

  /**
   * Altera o atributo do elemento no dom
   *
   * @private
   * @param {('checked' | 'indeterminate')} property
   * @param {boolean} value
   */
  private updateProperty(
    property: 'checked' | 'indeterminate',
    value: boolean
  ) {
    this.renderer.setProperty(this.element.nativeElement, property, value);
  }

  /**
   * Completa o subject e finaliza o observable
   */
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
