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
  private destroy = new Subject<void>();
  private history: string[] = [];
  constructor(
    private element: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private container: FormGroupName
  ) {}

  /**
   * Controle do checkbox group baseado
   * em alterações de controles filhos.
   */
  ngOnInit(): void {
    if (this.element) {
      console.log(this.element.nativeElement.parentElement.nextSibling);
    }
    var treeWalker = document.createTreeWalker(
      this.element.nativeElement.parentElement.nextSibling,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: function (node) {
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    var nodeList = [];
    var currentNode = treeWalker.currentNode;

    while (currentNode) {
      nodeList.push(currentNode);
      currentNode = treeWalker.nextSibling();
    }

    console.log(this.element.nativeElement.closest('input').nextElementSibling);

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
   * Controle dos filhos baseado em
   * alterações do checkbox group.
   */
  @HostListener('change', ['$event.target'])
  onChange({ checked }: HTMLInputElement) {
    this.updateProperty('indeterminate', false);
    if (this.container?.control) {
      this.toggleGroup(this.container.control, checked);
    }
  }

  toggleGroup(group: FormGroup, checked: boolean) {
    Object.values(group.controls).map((c) => c.setValue(checked));
  }

  getState(value: Record<string, boolean>) {
    const values = Object.values(value);
    const some = values.some((value) => value);
    const all = values.every((value) => value);
    return all ? all : some ? null : !!some;
  }

  private updateProperty(
    property: 'checked' | 'indeterminate',
    value: boolean
  ) {
    this.renderer.setProperty(this.element.nativeElement, property, value);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
