import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Import your library module
import { GenericChartModule } from 'projects/generic-chart/src/public-api';
import { GenericTableModule } from 'projects/generic-table/src/public-api';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { TablesModule } from "../../../tables/src/lib/tables.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule,
    AppRoutingModule,
    GenericChartModule,
    GenericTableModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    TablesModule
],
  providers: [],
  schemas:[NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
