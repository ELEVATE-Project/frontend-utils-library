import { NgModule } from '@angular/core';
import { SlFormsLibraryComponent } from './sl-forms-library.component';
import { TextQuestionComponent } from './text-question/text-question.component';
import { RadioTypeElementComponent } from './radio-type-element/radio-type-element.component';
import { CheckboxTypeElementComponent } from './checkbox-type-element/checkbox-type-element.component';
import { ChipTypeElementComponent } from './chip-type-element/chip-type-element.component';
import { SliderTypeElementComponent } from './slider-type-element/slider-type-element.component';
import { DateTypeElementComponent } from './date-type-element/date-type-element.component';
import { TextAreaElementComponent } from './text-area-element/text-area-element.component';
import { ToggleTypeElementComponent } from './toggle-type-element/toggle-type-element.component';
import { SelectTypeElementComponent } from './select-type-element/select-type-element.component';
import { RatingTypeElementComponent } from './rating-type-element/rating-type-element.component';



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
    RatingTypeElementComponent
  ],
  imports: [
  ],
  exports: [
    SlFormsLibraryComponent
  ]
})
export class SlFormsLibraryModule { }
