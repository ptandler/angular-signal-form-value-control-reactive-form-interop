import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  model,
  untracked,
} from '@angular/core';
import { Field, form, FormValueControl } from '@angular/forms/signals';
import { isEqual } from 'lodash-es';
import { NgxControlValueAccessor } from 'ngxtension/control-value-accessor';

export interface Test {
  stringValue: string;
  numberValue: number;
}

@Component({
  selector: 'custom-form-value-control',
  template: ` <div style="border: gray solid 2px">
    <input type="text" [field]="valueForm.stringValue" />
    <input type="number" [field]="valueForm.numberValue" />
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Field],
  hostDirectives: [NgxControlValueAccessor],
})
export class CustomControlComponent {
  protected readonly cva = inject(NgxControlValueAccessor<Test>);
  protected readonly valueForm = form(this.cva.value$, {
    name: 'CustomControlComponent Form',
  });
}
