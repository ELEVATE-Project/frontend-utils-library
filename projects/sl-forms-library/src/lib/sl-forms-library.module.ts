import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { SlFormsLibraryComponent } from './sl-forms-library.component';
import { TextQuestionComponent } from './components/text-question/text-question.component';
import { RadioTypeElementComponent } from './components/radio-type-element/radio-type-element.component';
import { CheckboxTypeElementComponent } from './components/checkbox-type-element/checkbox-type-element.component';
import { ChipTypeElementComponent } from './components/chip-type-element/chip-type-element.component';
import { SliderTypeElementComponent } from './components/slider-type-element/slider-type-element.component';
import { DateTypeElementComponent } from './components/date-type-element/date-type-element.component';
import { TextAreaElementComponent } from './components/text-area-element/text-area-element.component';
import { ToggleTypeElementComponent } from './components/toggle-type-element/toggle-type-element.component';
import { SelectTypeElementComponent } from './components/select-type-element/select-type-element.component';
import { RatingTypeElementComponent } from './components/rating-type-element/rating-type-element.component';



@NgModule({
  declarations: [
    SlFormsLibraryComponent,
    TextQuestionComponent,
    RadioTypeElementComponent,
    CheckboxTypeElementComponent,
    ChipTypeElementComponent,
    SliderTypeElementComponent,
    DateTypeElementComponent,
    TextAreaElementComponent,
    ToggleTypeElementComponent,
    SelectTypeElementComponent,
    RatingTypeElementComponent,
  ],
  imports: [
    //CommonModule
  ],
  exports: [
    SlFormsLibraryComponent,
    
  ]
})
export class SlFormsLibraryModule { }
