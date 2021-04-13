import { SwapFormsModule } from './../../swap-forms.module';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { axe, toHaveNoViolations, configureAxe } from 'jest-axe';
import { ButtonComponent } from './button.component';

expect.extend(toHaveNoViolations);
configureAxe({ rules: [] });

const CASES = {
  PRIMARY: `<button swap-button mode="primary">Primary</button>`,
  SECONDARY: `<button swap-button mode="primary">Secondary</button>`,
  RESET: `<button swap-button mode="secondary" type="reset">Limpar</button>`,
};

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent>;
  const createComponent = createComponentFactory({
    component: ButtonComponent,
    imports: [SwapFormsModule],
  });

  // beforeEach(() => (spectator = createComponent()));

  it('should demonstrate this matcher`s usage', async () => {
    const render = () => `<button swap-button mode="primary">Primary</button>`;

    // pass anything that outputs html to axe
    const html = render();

    console.log(html);

    expect(await axe(html)).toHaveNoViolations();
  });

  // it('should have a success class by default', () => {
  //   expect(spectator.component.mode).toBe('primary');
  // });

  // it('should have a success class by default', () => {
  //   const cmp = createComponent({ props: { mode: 'secondary' } });
  //   expect(cmp.component.mode).toBe('secondary');
  // });

  // it('should set the class name according to the [className] input', () => {
  //   spectator.setInput('mode', 'primary');
  //   expect(spectator.query('button')).toHaveClass('danger');
  //   expect(spectator.query('button')).not.toHaveClass('success');
  // });

  // let component: ButtonComponent;
  // let fixture: ComponentFixture<ButtonComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ ButtonComponent ]
  //   })
  //   .compileComponents();
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ButtonComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
