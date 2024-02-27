import { Component, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'lib-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxInputComponent,
      multi: true,
    },
  ],
})
export class CheckboxInputComponent implements OnInit, ControlValueAccessor {
  @Input() checkboxControl: any;
  selectedOptions: any;
  touched: boolean = false;

  form: FormGroup = this.fb.group({});
  stateChanges = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  onChange = (value: any) => {};

  onTouched = () => {};

  ngOnInit() {
    let value = this.checkboxControl.value;
    let optionsControl = this.checkboxControl.options.map((data: any) => {
      if (
        value &&
        value.find((val: any) => {
          return val.label == data.label;
        })
      ) {
        return new FormControl(data);
      } else {
        return new FormControl('');
      }
    });
    this.form.addControl(
      this.checkboxControl.name,
      new FormArray(optionsControl)
    );
    this.form
      .get(this.checkboxControl.name)
      ?.valueChanges.subscribe((value) => {
        let selectedValues = value.filter((val: any) => {
          return val;
        });
        if (!selectedValues.length) {
          this.onChange('');
        } else {
          this.onChange(selectedValues);
        }
        this.stateChanges.next();
      });
  }

  writeValue(value: any) {
    this.selectedOptions = '';
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

  onCheckboxChange(event: any, option: any, index: any) {
    let currentControl = this.form.get(this.checkboxControl.name) as FormArray;
    if (event.checked) {
      currentControl.controls[index].patchValue(option);
    } else {
      currentControl.controls[index].patchValue('');
    }
    this.markAsTouched();
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }
}
