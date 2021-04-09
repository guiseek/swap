import { Input, Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'footer[swap-form]',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFooterComponent {
  @Input('swap-form')
  public swapForm = '';
}
