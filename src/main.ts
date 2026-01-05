import { JsonPipe } from '@angular/common';
import {
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Field, form } from '@angular/forms/signals';
import { bootstrapApplication } from '@angular/platform-browser';
import { CustomControlComponent, Test } from './custom-control.component';

@Component({
  selector: 'app-root',
  template: `
    <h4>Field {{ value() | json }}</h4>
    <custom-form-value-control [field]="valueForm" /><br />
    <h4>FormControl {{ formControlValue() | json }}</h4>
    <custom-form-value-control [formControl]="formControl" />
    <br />
  `,
  imports: [ReactiveFormsModule, JsonPipe, CustomControlComponent, Field],
})
export class App {
  public readonly value = signal<Test>({ stringValue: 'hi!', numberValue: 42 });
  public readonly valueForm = form(this.value, { name: 'App Form' });

  // reactive form interop
  public readonly formControl = new FormControl();
  protected readonly formControlValue = toSignal(this.formControl.valueChanges);
}
// noinspection JSIgnoredPromiseFromCall
bootstrapApplication(App, { providers: [provideZonelessChangeDetection()] });
