import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';

@Component({
  selector: 'swap-select-panel',
  template: `
    <ng-template cdk-portal>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class SelectPanelComponent {
  @Input()
  public reference!: HTMLElement;

  @ViewChild(CdkPortal)
  public contentTemplate!: CdkPortal;

  protected overlayRef!: OverlayRef;

  private _showing: boolean = false;
  public get showing(): boolean {
    return this._showing;
  }
  public set showing(value: boolean) {
    this._showing = value;
  }

  constructor(protected overlay: Overlay) {}

  public show() {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate);
    this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => this.hide());
    this.showing = true;
  }

  public hide() {
    this.overlayRef.detach();
    this.showing = false;
  }

  @HostListener('window:resize')
  public onWinResize() {
    this.syncWidth();
  }

  protected getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.reference)
      .withPush(false)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  private syncWidth() {
    if (!this.overlayRef) {
      return;
    }

    const refRect = this.reference?.getBoundingClientRect();
    this.overlayRef.updateSize({ width: refRect.width });
  }
}
