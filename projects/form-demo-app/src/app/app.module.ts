import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DynamicFormModule, LanguageTranslatePipe } from 'dynamic-form';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { GenericChartModule } from 'dist/generic-chart';
import { GenericTableModule } from 'dist/generic-table';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamicFormModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    GenericChartModule,
    GenericTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [LanguageTranslatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
