import { OverlayRef, OverlayConfig } from '@angular/cdk/overlay'
import { CdkPortal } from '@angular/cdk/portal'

export interface SelectPanel {
  reference: HTMLElement

  contentTemplate: CdkPortal

  overlayRef: OverlayRef

  showing: boolean

  show: () => void

  hide: () => void

  onWinResize: () => void

  getOverlayConfig: () => OverlayConfig

  syncWidth: () => void
}
