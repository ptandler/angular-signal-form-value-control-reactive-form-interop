import {
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Field, form, maxLength } from '@angular/forms/signals';
import { bootstrapApplication } from '@angular/platform-browser';
import { CustomControlComponent, Test } from './custom-control.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  template: `
    <h4>Field {{ value() | json }}</h4>
    <custom-form-value-control [field]="valueForm" /><br/>
    <h4>FormControl {{ formControlValue() | json }}</h4>
    <form>
    <custom-form-value-control [formControl]="formControl" />
    </form><br/>
  `,
  imports: [CustomControlComponent, Field, ReactiveFormsModule, JsonPipe],
})
export class App {
  public readonly value = signal<Test>({ stringValue: 'hi!', numberValue: 17 });
  public readonly valueForm = form(this.value);

  // reactive form interop
  public readonly formControl = new FormControl();
  protected readonly formControlValue = toSignal(this.formControl.valueChanges);
}
bootstrapApplication(App, { providers: [provideZonelessChangeDetection()] });
