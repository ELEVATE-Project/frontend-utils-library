import { Component, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'lib-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioInputComponent,
      multi: true,
    },
  ],
})
export class RadioInputComponent implements OnInit, ControlValueAccessor {
  @Input() radioControl: any;
  selectedValue: any;
  touched: boolean = false;

  form: FormGroup;
  stateChanges = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  onChange = (value: any) => {};

  onTouched = () => {};

  ngOnInit() {
    this.form.addControl(
      this.radioControl.name,
      new FormControl(this.radioControl.value || null)
    );

    this.form.get(this.radioControl.name)?.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.stateChanges.next();
    });
  }

  writeValue(value: any) {
    this.selectedValue = '';
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.radioControl.disable() : this.radioControl.enable();
  }

  onRadioChange(event: any) {
    this.markAsTouched();
  }
}
