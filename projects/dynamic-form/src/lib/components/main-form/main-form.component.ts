import { Component,ElementRef,EventEmitter, HostListener, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatCalendarCellClassFunction, MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
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
  @Input() viewOnly: boolean = false;
  @Input() classFlex: any ;
  @Input() allowOpenLinks:boolean = false;
  @Input() language: any
  myForm: FormGroup = this.fb.group({});
  resources:any = [];
  @ViewChild('subform') subform: MainFormComponent | undefined
  @Output() controlChange = new EventEmitter<any>(); // parent component can detect the particular form-control changed
  @Output() formChange = new EventEmitter<any>();
  @Output() onClickTriggerParent = new EventEmitter<any>();
  @Output() onActionTriggerParent = new EventEmitter<any>();
  // ViewChildren to capture all tooltip instances
  @ViewChildren(MatTooltip) tooltips!: QueryList<MatTooltip>;
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

constructor(private fb: FormBuilder,public dialog: MatDialog,  private eRef: ElementRef) {}

  ngOnInit() {
    this.createForm(this.formJson);
    this.formJson.forEach((element:any) => {
      if(element.type == "addResource"){
        this.resources = element.value
      }
    });
  }

  createForm(controls: JsonFormControls[]) {
    if(controls) {
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
      disableClose: true,
      data: {
        control:control.dialogData,
        language:this.language
      }

    });
    const componentInstance = dialog.componentInstance;
    componentInstance.saveLearningResource.subscribe((result: any) => {
      if (result) {
        this.resources = this.resources ? this.resources.concat(result) : result;
          this.myForm.patchValue({
            [control.name]:this.resources
          });
          this.handleFocusOut()
      }
    });
  }
  addFields(controlName: any,value:any) {
    this.myForm.patchValue({
      [controlName]:this.subform?.myForm?.value
    });
  }

  deleteResource(index:any,name:any){
     this.resources.splice(index,1)
     this.myForm.patchValue({
      [name]:this.resources
    });
    this.handleFocusOut()
  }


  handleFocusOut(event?:any) {
    if(this.subform?.myForm) {
      this.myForm.value.recommended_duration = this.subform?.myForm.value;
      // instead of recommended duration, in subfields meta, parent control name need to be added.
    }
    for (let key in this.myForm.value) {
      this.myForm.value[key]= this.myForm.value[key].value ? this.myForm.value[key].value : this.myForm.value[key]
    }
    this.formChange.emit(this.myForm.value);
    this.controlChange.emit( event?.target?.id ? event.target?.id : event)
  }

  showTooltip(index: number) {
    const tooltipArray = this.tooltips.toArray();
    tooltipArray.forEach((tooltip, i) => {
      if (i === index) {
        tooltip.disabled = false;
        tooltip.show();
      } else {
        tooltip.disabled = true;
        tooltip.hide();
      }
    });
  }

  hideTooltip(index: number) {
    const tooltipArray = this.tooltips.toArray();
    tooltipArray[index]?.hide();
    tooltipArray[index].disabled = true;
  }

  // Listen to document clicks to hide tooltips when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.tooltips.forEach(tooltip => {
        tooltip.hide();
        tooltip.disabled = true;
      });
    }
  }

  togglefield(event:any) {
    if(this.viewOnly){
      event.source.checked = !event.checked;
    }
  }

  navigateToParent(control:any){
    this.onClickTriggerParent.emit(control);
  }

  OnActionTriggerParent(action:any,i:any, item:any){
    let control = {
      action: action,
      item: item,
      index: i,
    };
    this.onActionTriggerParent.emit(control);
  }

  checkminDate(control: any) {
    if (control.minDependentChild) {
      const dependentControl = this.myForm.get(control.minDependentChild);
      return dependentControl ? dependentControl.value : null;
    }
    return null;
  }
  
  checkmaxDate(control: any) {
    if (control.maxDependentChild) {
      const dependentControl = this.myForm.get(control.maxDependentChild);
      return dependentControl ? dependentControl.value : null;
    }
    return null;
  }


  getAdjustedDate(control:any): any {
    let rawDate = this.myForm.get(control.name)
    if(control.name === 'endDate' || control.name === 'end_date'){
      const date = new Date(rawDate?.value);
      date.setHours(23, 59, 59, 999);// Set to 11:59 PM UTC
      this.myForm.patchValue({
        [control.name]:date
      });
    }else{
      let date= new Date(rawDate?.value);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      this.myForm.patchValue({
        [control.name]:date
      });
    }
    this.handleFocusOut(control);
  }

  openResourceLink(url:any){
    if(this.allowOpenLinks){
      window.open(url, '_blank');
    }
  }
  
}
