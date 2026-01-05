import { JsonPipe } from '@angular/common';
import {
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { form } from '@angular/forms/signals';
import { bootstrapApplication } from '@angular/platform-browser';
import { CustomControlComponent, Test } from './custom-control.component';

@Component({
  selector: 'app-root',
  template: `
    <!-- NOTE: Uncomment to test usage with [field] (and import Field directive) -->
    <!--
    <h4>Field {{ value() | json }}</h4>
    <custom-form-value-control [field]="valueForm" /><br />
    -->
    <h4>FormControl {{ formControlValue() | json }}</h4>
    <custom-form-value-control [formControl]="formControl" />
    <br />
  `,
  imports: [ReactiveFormsModule, JsonPipe, CustomControlComponent],
})
export class App {
  // for usage with [field]
  public readonly value = signal<Test>({ stringValue: 'hi!', numberValue: 42 });
  public readonly valueForm = form(this.value, { name: 'App Form' });

  // for usage with [formControl]
  public readonly formControl = new FormControl<Test>(
    {
      stringValue: 'ho?',
      numberValue: 17,
    },
    { nonNullable: true },
  );
  protected readonly formControlValue = toSignal(this.formControl.valueChanges);
}
// noinspection JSIgnoredPromiseFromCall
bootstrapApplication(App, { providers: [provideZonelessChangeDetection()] });
