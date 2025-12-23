import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
} from '@angular/core';
import {
  DisabledReason,
  Field,
  form,
  FormValueControl,
  max,
  required,
  ValidationError,
  WithOptionalField,
} from '@angular/forms/signals';

export interface Test {
  stringValue: string;
  numberValue: number;
}

@Component({
  selector: 'custom-form-value-control',
  template: `<div style="border: gray solid 2px">
    <input type="text" [field]="valueForm.stringValue"/>
    <input type="number" [field]="valueForm.numberValue"/>
   </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Field],
})
export class CustomControlComponent implements FormValueControl<Test> {
  public readonly value = model<Test>({ stringValue: 'x', numberValue: 42 });
  protected readonly valueForm = form(this.value);
}
