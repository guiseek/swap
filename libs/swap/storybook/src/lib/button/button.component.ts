import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'storybook-button',
  templateUrl: './button.component.html',
  styleUrls: ['./../swap.container.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() mode: 'primary' | 'secondary' = 'primary';

  @Input() text: string = 'Text';

  constructor() {}

  ngOnInit(): void {}
}
