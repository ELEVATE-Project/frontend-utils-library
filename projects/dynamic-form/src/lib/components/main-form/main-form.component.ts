import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { AddResourceComponent } from '../add-resource/add-resource.component';

interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  nullValidator?: boolean;
}

interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

interface JsonFormErrorMessages {
  required?: string;
  email?: string;
  minlength?: string;
  pattern?: string;
  min?: string;
  max?: string;
  requiredtrue?: string;
  nullvalidator?: string;
}

interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  class: string;
  position: string;
  disabled?: boolean;
  options?: JsonFormControlOptions;
  validators: JsonFormValidators;
  numberOfStars?: number;
  errorMessage?: JsonFormErrorMessages;
  dependentKey?: string;
  isNumberOnly?: boolean;
  placeHolder?: string;
}
export interface DynamicFormData {
  controls: JsonFormControls[];
}

@Component({
  selector: 'dynamic-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
})
export class MainFormComponent implements OnInit {
  @Input() formJson: any;
  @Input() classFlex: any ;
  @Output() onChange = new EventEmitter<{ event: any, control: any }>();
  @Output() onFocus = new EventEmitter<string>();

  myForm: FormGroup = this.fb.group({});
  resources:any;
  @ViewChild('subform') subform: MainFormComponent | undefined;

  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = true;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'warn';
  currentDate = new Date();
  maxDate = new Date(
    this.currentDate.getFullYear() + 10,
    this.currentDate.getMonth(),
    this.currentDate.getDate()
  );
  dependedChild: any;
  dependedChildDate = '';
  dependedParent: any;
  dependedParentDate: any;
  @ViewChild('picker') picker: MatDatepicker<Date> | undefined;

constructor(private fb: FormBuilder,public dialog: MatDialog) {}

  ngOnInit() {
    this.createForm(this.formJson);
  }

  createForm(controls: JsonFormControls[]) {
    for (const control of controls) {
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }
      this.myForm.addControl(
        control.name,
        this.fb.control(
          { value: control.value, disabled: control.disabled || false },
          validatorsToAdd
        )
      );
    }
  }

  dateSelected(event: any, control: any) {
    const indexToEdit = this.formJson.findIndex(
      (formControl: any) => formControl.name === control.name
    );
    if (indexToEdit !== -1) {
      this.formJson[indexToEdit].value = event.value;
    }
    if (control.dependedChild) {
      this.dependedChild = control.dependedChild;
      this.dependedChildDate = event.value;
    } else {
      this.dependedParent = control.dependedParent;
      this.dependedParentDate = event.value;
    }
  }

  togglePasswordVisibility(control: any) {
    control.type = control.type === 'password' ? 'text' : 'password';
    control.showPasswordIcon = true;
  }

  compareWith(value1: any, value2: any) {
    return JSON.stringify(value1.value) == JSON.stringify(value2);
  }

  onClickAddResource(control:any){
    let dialog = this.dialog.open(AddResourceComponent, {
      data: {
        control:control.dialogData
      }

    });
    const componentInstance = dialog.componentInstance;
    componentInstance.saveLearningResource.subscribe((result: any) => {
      if (result) {
        this.resources = result;
          this.myForm.patchValue({
            [control.name]:this.resources 
          });
      }
    });
  }
  addFields(controlName: any,value:any) {
    this.myForm.patchValue({
      [controlName]:this.resources?.myForm.value
    });
  }

  deleteResource(index:any,name:any){
     this.resources.splice(index,1)
     this.myForm.patchValue({
      [name]:this.resources 
    });
  }

  onSelectChange(event: any, control: any) {
    this.onChange.emit({event, control});
  }

  onSelectFocus(controlName: any) {
    this.onFocus.emit(controlName);
  }
}
