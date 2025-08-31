import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GenericTableService } from '../../generic-table.service';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { paginatorConstants } from '../../constants/paginatorConstats';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = paginatorConstants.defaultPageSize;
  pageSizeOptions = paginatorConstants.pageSizeOptions;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() url: any;
  @Input() headers: any;
  @Input() labels: any;
  @Input() legends: any;
  @Input() showDownload: boolean = true;
  @Input() title: any = true;
  @Output() downloadEvent = new EventEmitter();
  filters: { [key: string]: string[] } = {};
  searches: { [key: string]: string[] } = {};
  filterValues: { [key: string]: any } = {};
  dateFilters: { [key: string]: any } = {};
  searchValues: { [key: string]: string } = {};
  @Input() metaKeys:any;

  body: any = {};
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  sortType ="ASC";
  sortColumn: any;
  columns :any= [];
  isDownload :boolean = false;
  noData:boolean = false;
  data :any= [];
  searchColmn :any =[]
  searchText :any =[]
  filterColmn :any =[]
  filterText :any =[]
  options:any = [];
  showPopup = false;
  startDate: any;
  endDate: any;
  dateError = false;

  private searchSubject = new Subject<{ event: any, key: any }>();
  page: any = 1;
  tableDataCount: any;
  filteredObjects: any;
  isValidSearch: any= false;
  activeSearchColumn: string | null = null;

  constructor(private apiService: GenericTableService,
    private datePipe: DatePipe
  ) { 
    this.isMobile();
   }
   isMobile(){
    return /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.url +=`&sort_column=${this.sortColumn}&sort_type=${this.sortType}&download_csv=${this.isDownload}&pageNo=${this.page}&Limit=${this.pageSize}`;
      this.getTableData(this.url, this.body);
    }, 100);

    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(({ event, key }) => {
      this.performSearch(event, key);
    });
  }

  getTableData(apiUrl:any, apiBody: any) {
    const paylaod = { url: apiUrl, headers: this.headers, body: apiBody }
    this.apiService.post(paylaod).then((data: any) => {
      if (data.result?.data) {
        this.isDownload = false;
        this.columns = data.result.config ? data.result.config.columns :[];
        this.data = data.result.data ? data.result.data : []; 
        this.tableDataCount = data.result.count ? data.result.count : "";
        if(data.result.filters){
          this.filteredObjects = data.result.filters;
        }
        this.initializeTable();
      }
    },error =>{   console.log("getTableData error in lib:", error);
    })
  }

  clearFilters() {
    Object.keys(this.searchValues).forEach((key) => {
      this.searchValues[key] = '';
    });
    Object.keys(this.filterValues).forEach((key) => {
      this.filterValues[key] = null;
    });
    Object.keys(this.dateFilters).forEach((key) => {
      this.dateFilters[key] = null;
    });
    this.sortColumn = null;
    this.sortType = '';
    this.isDownload = false;
    this.dataSource.data = [];
    this.filters = {};
    this.searches = {};
    this.body = {};
    this.paginator.firstPage();

    this.url = this.url
        .replace(/(pageNo=\d+)/, `pageNo=${this.page}`)
        .replace(/(Limit=\d+)/, `&Limit=${this.pageSize}`);

    this.getTableData(this.url, this.body);
}


  onSort(data: any) {
    this.sortColumn = data;
    this.sortType = this.sortType === "ASC" ? "DESC" : "ASC";
    this.url =  this.url.replace(/sort_type=[^&]*/, `sort_type=${this.sortType}`);
    this.url =  this.url.replace(/sort_column=[^&]*/, `sort_column=${ this.sortColumn}`);
    this.paginator.firstPage()
    this.url = this.url
      .replace(/pageNo=\d+/, `pageNo=${this.page}`);
    this.getTableData(this.url, this.body);
  }
  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  initializeTable(): void {
    this.dataSource.data = this.data;
    if(this.data?.length){
      this.displayedColumns = Object.keys(this.data[0]);
    }
  }
  getHeaderLabel(columnKey: string): string {
    const column = this.columns.find((col: any) => col.key === columnKey);
    return column ? column.label : columnKey;
  }
  onSearch(event: any, key: any) {
    // this.searchSubject.next({ event, key });
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9]*$/;

    this.activeSearchColumn = key; 

    if (regex.test(value)) {
      this.isValidSearch = true;
      this.searchSubject.next({ event, key });
    } else {
      this.isValidSearch = false;
    }
  }

  performSearch(event: any, key: any) {
    const value = event.target.value;
    if (value.length) {
      this.searches[key] = [value];
    } else {
      delete this.searches[key];
    }
    this.paginator.firstPage()
    this.url = this.url
      .replace(/pageNo=\d+/, `pageNo=${this.page}`);
    this.body = { filters: this.filters, search: this.searches };
    this.getTableData(this.url, this.body);
  }
  onFilter(event: any, key: string) {
    let value = event.value;
  
    if (!Array.isArray(value)) {
      value = [value];
    }
    if (value && value.length) {
      this.filters[key] = value;
    } else {
      delete this.filters[key];
    }
    this.paginator.firstPage()
    this.url = this.url
      .replace(/pageNo=\d+/, `pageNo=${this.page}`);
    this.body = { filters: this.filters, search: this.searches };
    this.getTableData(this.url, this.body);
  }

  onDate(event: any, key: string) {
    const selectedDate = event && event.target.value;
    if (selectedDate) {
      const formattedDate = selectedDate.getFullYear() + '-' +
      String(selectedDate.getMonth() + 1).padStart(2, '0') + '-' +
      String(selectedDate.getDate()).padStart(2, '0');
      this.filters[key] = [formattedDate]; 
    } else {
      delete this.filters[key];
    }
    this.paginator.firstPage()
    this.url = this.url
      .replace(/pageNo=\d+/, `pageNo=${this.page}`);
    this.body = { filters: this.filters, search: this.searches };
    this.getTableData(this.url, this.body);
  }
  isSearchable(columnKey: any) {
    const column = this.columns.find((col: any) => col.key === columnKey);
    return column?.search
  }
  isFilterable(columnKey: any) {
    const column = this.columns.find((col: any) => col.key === columnKey);
    if(column.dataType !== "Date"){
      this.options = column.filters = this.filteredObjects[column.key];
      return column?.filter
    }
  }
  checkMultiple(columnKey: any) {
    const column = this.columns.find((col: any) => col.key === columnKey);
      return column?.isMultipleFilter
  }

  isDatePicker(columnKey: any) {
    const column = this.columns.find((col: any) => col.key === columnKey && col.dataType === 'Date');
    return column?.filter
  }
  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  validateDates() {
    if (this.startDate && this.endDate) {
      this.dateError = this.endDate < this.startDate;
    } else {
      this.dateError = false;
    }
  }

  submitDates() {
    if (!this.dateError) {
      const startDateEpoch = new Date(this.startDate.setHours(0, 0, 0, 0)).getTime() / 1000;
      const endDateEpoch = new Date(this.endDate.setHours(23, 59, 59, 0)).getTime() / 1000;
      this.downloadCSV(startDateEpoch,endDateEpoch);
    }
  }

  downloadCSV(startDate :any, endDate:any){
    this.url =  this.url.replace(/start_date=[^&]*/, `start_date=${startDate}`);
    this.url =  this.url.replace(/end_date=[^&]*/, `end_date=${endDate}`);
    this.url =  this.url.replace(/download_csv=[^&]*/, `download_csv=true`);
    this.apiService.post({url :  this.url,body:this.body, headers: this.headers}).then((data:any)=>{  
      if(data.result && data.result.reportsDownloadUrl){
        this.noData = false;
        const timestamp: number = new Date().getTime();
        console.log("265 ***************>", this.isMobile());
          if(this.isMobile()){
            console.log("266");
            let downloadData = {
              url :data.result.reportsDownloadUrl,
              fileName: `${this.title}${timestamp}.csv`
            }
            this.downloadEvent.emit(downloadData);
          }else{
            console.log("274");
          const link = document.createElement('a');
          link.href = data.result.reportsDownloadUrl;
          link.download = `${this.title}${timestamp}.csv`; 
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
      this.closePopup();
      }else{
        this.noData = true;
      }
    })
  }
  formatDate(date: Date | null): string {
    return date ? this.datePipe.transform(date, 'dd/MM/yyyy') || '' : '';
  }
  onPageChange(event: { pageIndex: number; }){
    this.page = event.pageIndex + 1;
    this.pageSize = this.paginator.pageSize;
    this.url = this.url
      .replace(/pageNo=\d+/, `pageNo=${this.page}`)
      .replace(/Limit=\d+/, `Limit=${this.pageSize}`);
    this.getTableData(this.url, this.body);
  }

  hasFiltersData(): boolean {
    const hasFilterKeys = Object.keys(this.filters).length > 0;
    const hasSearchValue = Object.keys(this.searches).length > 0;
    return hasFilterKeys || hasSearchValue;
  }
  compareWithArray(o1: any, o2: any): boolean {
    if (Array.isArray(o1) && Array.isArray(o2)) {
      return JSON.stringify(o1) === JSON.stringify(o2);
    }
    return o1 === o2;
  }
}
