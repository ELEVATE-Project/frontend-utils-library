import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TablesComponent } from './tables.component';
import { GenericTableCompComponent } from './components/generic-table-comp/generic-table-comp.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    TablesComponent,
    GenericTableCompComponent
  ],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatSortModule
  ],
  schemas:[NO_ERRORS_SCHEMA],
  exports: [
    TablesComponent,
    GenericTableCompComponent
  ]
})
export class TablesModule { }
