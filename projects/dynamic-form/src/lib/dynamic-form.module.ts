import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';
import { MainFormComponent } from './components/main-form/main-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { ChipInputComponent } from './components/chip-input/chip-input.component';
import { DialogInputComponent } from './components/dialog-input/dialog-input.component';
import { RadioInputComponent } from './components/radio-input/radio-input.component';
import { CheckboxInputComponent } from './components/checkbox-input/checkbox-input.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DynamicFormComponent,
    MainFormComponent,
    ChipInputComponent,
    DialogInputComponent,
    RadioInputComponent,
    CheckboxInputComponent,
    StarRatingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    AngularEditorModule,
    HttpClientModule
  ],
  exports: [MainFormComponent],
})
export class DynamicFormModule {}
