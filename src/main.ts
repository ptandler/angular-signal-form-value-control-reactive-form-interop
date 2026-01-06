import { JsonPipe } from '@angular/common';
import {
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Field, form } from '@angular/forms/signals';
import { bootstrapApplication } from '@angular/platform-browser';
import { isEqual } from 'lodash-es';
import {
  provideCvaCompareTo,
  provideCvaDefaultValue,
} from './control-value-accessor';
import { CustomControlComponent, Test } from './custom-control.component';

@Component({
  selector: 'app-root',
  providers: [
    provideCvaDefaultValue({ stringValue: 'a', numberValue: 9 }),
    provideCvaCompareTo(isEqual, true),
  ],
  template: `
    <h4>Field {{ value() | json }}</h4>
    <!-- When I comment the next line, everything works fine. -->
    <custom-form-value-control [field]="valueForm" /><br />
    <!--  This can be used as work-around for now:  -->
    <!--    <custom-form-value-control [(ngModel)]="valueForm().value" /><br />-->
    <!--
    <h4>FormControl {{ formControlValue() | json }}</h4>
    <custom-form-value-control [formControl]="formControl" />
    <br />
-->
  `,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    Field,
    CustomControlComponent,
    JsonPipe,
  ],
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
