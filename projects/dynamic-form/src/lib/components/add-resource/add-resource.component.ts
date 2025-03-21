import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'lib-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrl: './add-resource.component.css'
})
export class AddResourceComponent {
  data: any;
  myGroup: FormGroup;
  @Output() saveLearningResource = new EventEmitter<any>();
  values:any = []
  language:any

  constructor(public dialogRef: MatDialogRef<AddResourceComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.myGroup = new FormGroup({
      resources: new FormArray([])
    });
    // Optionally, initialize with one resource
    this.addResource();
    this.language = this.dialogData.language
   }

   get resources() {
    return this.myGroup.get('resources') as FormArray;
  }

  addResource() {
    let formControls: { [key: string]: any } = {};
    for (let control of this.dialogData.control.resource[0]) {
      let validators = [];
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validators.push(Validators.min(value as number));
            break;
          case 'max':
            validators.push(Validators.max(value as number));
            break;
          case 'required':
            if (value) {
              validators.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validators.push(Validators.requiredTrue);
            }
            break;
          case 'maxLength':
            validators.push(Validators.maxLength(value as number));
            break;
          case 'pattern':
            validators.push(Validators.pattern(value as string));
            break;
          case 'nullValidator':
            if (value) {
              validators.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }
      // Add more validators here if needed
      formControls[control.name] = new FormControl('', validators);
    }
    const resourceGroup = new FormGroup(formControls);
    this.resources.push(resourceGroup);
  }

   onClickAddResource(){
    this.addResource()
    let data =  this.dialogData.control.resource[0]
    this.dialogData.control.resource.push(data)
   }

   confirmButton(){
    this.saveLearningResource.emit(this. getValues())
   }

   getValues() {
    if(this.myGroup.valid){
      return this.myGroup?.value?.resources
    }
  }

}
