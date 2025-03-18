import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  columns = [
    { key: 'id', label: 'Id', searchable: true, filterable: false },
    { key: 'name1', label: 'Name', searchable: true, filterable: false },
    { key: 'age', label: 'Age', searchable: false, filterable: true },
    { key: 'department', label: 'Department Name', searchable: false, filterable: true },
    { key: 'salaryAmount', label: 'Salary Amount', searchable: false, filterable: true },
  ];
  
  data = [
    { id: 'abc', name1: 'Alice', age: 25, department: 'Engineering', salaryAmount: 2500 },
    { id: 2, name1: 'Bob', age: 30, department: 'Marketing', salaryAmount: 3000 },
    { id: 3, name1: 'Charlie', age: 35, department: 'HR', salaryAmount: 2800 },
    { id: 4, name1: 'Dave', age: 28, department: 'Finance', salaryAmount: 3200 },
  ];
  
  options =[{label:'Lable 1', value:'label1'}, {label:'Lable 1', value:'label1'}]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.initializeTable(this.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initializeTable(data: any[]): void {
    this.dataSource.data = data;
    this.displayedColumns = Object.keys(data[0]);
  }

  getHeaderLabel(columnKey: string): string {
    const column = this.columns.find(col => col.key === columnKey);
    return column ? column.label : columnKey;
  }

  filteredData = [...this.data];

  onSearch(event: any, key: string) {
    const value = event.target.value.toLowerCase();
    this.filteredData = this.data.filter((item:any) =>
      item[key].toString().toLowerCase().includes(value)
    );
  }

  onFilter(event: any, key: string) {
    const value = event.target.value;
    this.filteredData = value
      ? this.data.filter((item:any) => item[key].toString() === value)
      : [...this.data];
  }

  getFilterOptions(key: string) {
    return [{label:'Lable 1', value:'label1'}, {label:'Lable 1', value:'label1'}];
  }

  isSearchable(columnKey : string){
    const column = this.columns.find(col => col.key === columnKey);
    return column?.searchable
  }
  isFilterable(columnKey : string){
    const column = this.columns.find(col => col.key === columnKey);
    return column?.filterable
  }
}