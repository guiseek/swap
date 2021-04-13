import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { ControlDirective } from './control.directive';

describe('ControlDirective', () => {
  let spectator: SpectatorDirective<ControlDirective>;
  const createDirective = createDirectiveFactory(ControlDirective);

  beforeEach(() => {
    spectator = createDirective(`
    <label swap-checkbox>
      <span>Control</span>
      <input type="checkbox" swap-control>
    </label>`);
  });

  it('should create an instance', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
