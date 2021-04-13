import { SelectPanelComponent } from './select-panel.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Select } from './interfaces/select.interface';
import { OptionComponent } from './option.component';
import { SelectService } from './select.service';
import { NG_VALUE_ACCESSOR, SelectControlValueAccessor } from '@angular/forms';
import {
  Input,
  ViewChild,
  Component,
  ElementRef,
  QueryList,
  forwardRef,
  ContentChildren,
  AfterContentInit,
  ChangeDetectorRef,
  Renderer2,
} from '@angular/core';

const SelectProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true,
};

@Component({
  selector: 'swap-select',
  templateUrl: './select.component.html',
  providers: [SelectService, SelectProvider],
})
export class SelectComponent
  extends SelectControlValueAccessor
  implements Select, AfterContentInit {
  @Input()
  public label = '';

  @Input()
  public placeholder = '';

  @Input()
  public selected = '';

  @Input()
  public required = false;

  @Input()
  public disabled = false;

  @ViewChild('input')
  public input!: ElementRef;

  @ViewChild(SelectPanelComponent)
  public panel!: SelectPanelComponent;

  @ContentChildren(OptionComponent)
  public options!: QueryList<OptionComponent>;

  public selectedOption!: OptionComponent;

  private _displayText: string = '';
  public get displayText(): string {
    return this._displayText;
  }
  public set displayText(value: string) {
    this._displayText = value;
  }

  public onChangeFn = (_: any) => {};

  public onTouchedFn = () => {};

  private _keyManager!: ActiveDescendantKeyManager<OptionComponent>;

  public get keyManager(): ActiveDescendantKeyManager<OptionComponent> {
    return this._keyManager;
  }
  public set keyManager(value: ActiveDescendantKeyManager<OptionComponent>) {
    this._keyManager = value;
  }

  constructor(
    readonly panelService: SelectService,
    private _changeDetectorRef: ChangeDetectorRef,
    readonly renderer: Renderer2,
    readonly element: ElementRef<HTMLElement>
  ) {
    super(renderer, element);
    this.panelService.register(this);
    this.keyManager = this.getKeyManager();
  }

  public ngAfterContentInit() {
    this.selectedOption = this.options
      .toArray()
      .find((option) => option.key === this.selected) as OptionComponent;

    this.displayText = this.selectedOption ? this.selectedOption.value : '';
    this.keyManager = this.getKeyManager();
  }

  getKeyManager() {
    return new ActiveDescendantKeyManager(this.options)
      .withHorizontalOrientation('ltr')
      .withVerticalOrientation()
      .withWrap();
  }
  public showPanel() {
    this.panel.show();

    if (!this.options.length) {
      return;
    }

    this.selected
      ? this.keyManager.setActiveItem(this.selectedOption)
      : this.keyManager.setFirstItemActive();
  }

  public hidePanel() {
    this.panel.hide();
  }

  public onPanelMenuIconClick(event: UIEvent): void {
    this.input.nativeElement.focus();
    this.input.nativeElement.click();
    this._changeDetectorRef.detectChanges();
  }

  public onKeyDown(event: KeyboardEvent): void {
    let KEYS = ['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up'];

    if (KEYS.indexOf(event.key) > -1) {
      if (!this.panel.showing) {
        return this.showPanel();
      }

      if (!this.options.length) {
        return event.preventDefault();
      }
    }

    KEYS = [
      'Up',
      'ArrowUp',
      'Down',
      'ArrowDown',
      'ArrowRight',
      'Right',
      'ArrowLeft',
      'Left',
    ];

    if (event.key === 'Enter' || event.key === ' ') {
      this.selectedOption = this.keyManager.activeItem as OptionComponent;
      this.selected = this.selectedOption.key;
      this.displayText = this.selectedOption ? this.selectedOption.value : '';

      this.hidePanel();
      // this.onChange()

      event.preventDefault();
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      if (this.panel.showing) {
        this.hidePanel();
      }
    } else if (KEYS.indexOf(event.key) > -1) {
      this.keyManager.onKeydown(event);
    } else if (
      event.key === 'PageUp' ||
      event.key === 'PageDown' ||
      event.key === 'Tab'
    ) {
      this.panel.showing && event.preventDefault();
    }
  }

  public selectOption(option: OptionComponent) {
    this.keyManager.setActiveItem(option);

    this.selected = option.key;
    this.selectedOption = option;
    this.displayText = this.selectedOption ? this.selectedOption.value : '';

    this.hidePanel();
    this.input.nativeElement.focus();
    // this.onChange()
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(obj: any): void {
    this.selected = obj;
  }

  // public onTouched() {
  //   this.onTouchedFn()
  // }

  // public onChange() {
  //   this.onChangeFn(this.selected)
  // }
}
