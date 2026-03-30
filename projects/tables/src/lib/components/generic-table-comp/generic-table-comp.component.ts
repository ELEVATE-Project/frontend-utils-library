import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'lib-generic-table-comp',
  templateUrl: './generic-table-comp.component.html',
  styleUrls: ['./generic-table-comp.component.css']
})
export class GenericTableCompComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  data = [
    { title: 'abc', created_by: 'Alice', name: "demo 1", date: 'Engineering', type: 'private', category: 'one', session_attended: 'No', duration: 7  },
    { title: 2, created_by: 'Bob', name: "demo 2", date: 'Marketing', type: 'private', category: 'one', session_attended: 'No', duration: 7  },
    { title: 3, created_by: 'Charlie', name: "demo 3", date: 'HR', type: 'private', category: 'one', session_attended: 'No', duration: 7  },
    { title: 4, created_by: 'Dave', name: "demo 4", date: 'Finance', type: 'private', category: 'one', session_attended: 'No', duration: 7  },
    { title: 5, created_by: 'Bob', name: "demo 5", date: 'Marketing', type: 'private', category: 'one', session_attended: 'No', duration: 7  },
    { title: 6, created_by: 'Charlie', name: "demo 6", date: 'HR', type: 'private', category: 'one', session_attended: 'No', duration: 7  },
    { title: 7, created_by: 'Dave', name: "demo 7", date: 'Finance', type: 'private', category: 'one', session_attended: 'No', duration: 7  }
  ];

  columns = [
    { key: 'title', label: 'Session title', searchable: true, filterable: false },
    { key: 'created_by', label: 'Session created by', searchable: true, filterable: false },
    { key: 'name', label: 'Mentor name', searchable: false, filterable: true },
    { key: 'date', label: 'Date of session', searchable: false, filterable: true },
    { key: 'type', label: 'Session type', searchable: false, filterable: true },
    { key: 'category', label: 'Category', searchable: false, filterable: true },
    { key: 'session_attended', label: 'Session attended', searchable: false, filterable: true },
    { key: 'duration', label: 'Duration of session attend in minutes', searchable: false, filterable: true },
  ];
  
  options =[{label:'Lable 1', value:'label1'}, {label:'Lable 1', value:'label1'}]

  filteredData = [...this.data];

  constructor() { }

  ngOnInit(): void {
    this.initializeTable(this.data);
  }
  initializeTable(data: any[]): void {
    this.dataSource.data = data;
    this.displayedColumns = Object.keys(data[0]);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getHeaderLabel(columnKey: string): string {
    const column = this.columns.find(col => col.key === columnKey);
    return column ? column.label : columnKey;
  }
  onSearch(event: any, key: string) {
    const value = event.target.value.toLowerCase();
    this.filteredData = this.data.filter((item:any) =>
      item[key].toString().toLowerCase().includes(value)
    );
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
  onFilter(event: any, key: string) {
    const value = event.target.value;
    this.filteredData = value
      ? this.data.filter((item:any) => item[key].toString() === value)
      : [...this.data];
  }

}
