import { NgModule } from '@angular/core';
import { GenericTableComponent } from './generic-table.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  imports: [
    GenericTableComponent,
    TableComponent
  ],
  exports: [
    GenericTableComponent,
    TableComponent
  ]
})
export class GenericTableModule { }
