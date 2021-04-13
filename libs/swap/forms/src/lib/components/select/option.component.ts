import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { SelectService } from './select.service';
import { Option, Select } from './interfaces';

@Component({
  selector: 'swap-option',
  template: `{{ value }}`,
})
export class OptionComponent implements Option, Highlightable {
  @Input()
  public key!: string;

  @Input()
  public value!: string;

  @HostBinding('class.selected')
  public get selected(): boolean {
    return this.select.selectedOption === this;
  }

  @HostBinding('class.active')
  public active = false;

  private _select: Select;

  public get select(): Select {
    return this._select;
  }

  public set select(value: Select) {
    this._select = value;
  }

  constructor(private dropdownService: SelectService) {
    this._select = this.dropdownService.getSelect();
  }

  public getLabel(): string {
    return this.value;
  }

  public setActiveStyles(): void {
    this.active = true;
  }

  public setInactiveStyles(): void {
    this.active = false;
  }

  @HostListener('click', ['$event'])
  public onClick(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.select.selectOption(this);
  }
}
