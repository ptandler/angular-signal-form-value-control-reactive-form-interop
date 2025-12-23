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
export class CustomControlComponent implements FormValueControl<Test> {
  protected readonly cva = inject(NgxControlValueAccessor<Test>);
  public readonly value = model<Test>({
    stringValue: 'ho! ho! ho!',
    numberValue: 24,
  });
  protected readonly valueForm = form(this.value, {
    name: 'CustomControlComponent Form',
  });
  constructor() {
    // sync model to CVA
    effect(() => {
      const modelValue = this.value();
      const cvaValue = untracked(this.cva.value$);
      if (!isEqual(modelValue, cvaValue)) {
        this.cva.value$.set(modelValue);
      }
    });
    // sync CVA to model
    effect(() => {
      const modelValue = untracked(this.value);
      const cvaValue = this.cva.value$();
      if (!isEqual(modelValue, cvaValue)) {
        this.value.set(cvaValue);
      }
    });
  }
}
