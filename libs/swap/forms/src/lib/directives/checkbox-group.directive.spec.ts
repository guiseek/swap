import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { CheckboxGroupDirective } from './checkbox-group.directive';

describe('CheckboxGroupDirective', () => {
  let spectator: SpectatorDirective<CheckboxGroupDirective>;
  const createDirective = createDirectiveFactory(CheckboxGroupDirective);

  beforeEach(() => {
    spectator = createDirective(`
    <label swap-checkbox>
      <span>Group</span>
      <input type="checkbox" swap-checkbox-group>
    </label>`);
  });

  it('should create an instance', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
