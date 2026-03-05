import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  input,
  output,
  signal,
  computed,
  inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { GenericTableService } from '../../generic-table.service';
import { paginatorConstants } from '../../constants/paginatorConstats';
import moment from 'moment';

@Component({
  selector: 'lib-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
  ],
  providers: [DatePipe],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
  // ── DI via inject() ──────────────────────────────────────────────────────
  private readonly apiService = inject(GenericTableService);
  private readonly datePipe = inject(DatePipe);
  private readonly cdr = inject(ChangeDetectorRef);

  // ── View children ────────────────────────────────────────────────────────
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // ── Signal inputs ────────────────────────────────────────────────────────
  readonly url = input.required<string>();
  readonly headers = input<any>(null);
  readonly title = input<string>('');
  readonly metaKeys = input<any>(null);
  readonly showDownload = input<boolean>(true);

  // ── Outputs ──────────────────────────────────────────────────────────────
  readonly downloadEvent = output<{ url: string; fileName: string }>();

  // ── Paginator config ─────────────────────────────────────────────────────
  readonly pageSize = paginatorConstants.defaultPageSize;
  readonly pageSizeOptions = paginatorConstants.pageSizeOptions;

  // ── Mat table data source (single stable instance) ──────────────────────
  readonly dataSource = new MatTableDataSource<any>();
  readonly displayedColumns = signal<string[]>([]);
  readonly columns = signal<any[]>([]);
  readonly tableDataCount = signal<number>(0);
  readonly filteredObjects = signal<any>({});
  readonly showPopup = signal(false);
  readonly noData = signal(false);
  readonly dateError = signal(false);
  readonly isValidSearch = signal(false);
  readonly activeSearchColumn = signal<string | null>(null);

  // ── Derived state ────────────────────────────────────────────────────────
  readonly hasData = signal(false);

  // ── Filter / search state (plain objects, mutated intentionally) ──────────
  filters: Record<string, string[]> = {};
  searches: Record<string, string[]> = {};
  filterValues: Record<string, any> = {};
  dateFilters: Record<string, any> = {};
  searchValues: Record<string, string> = {};

  startDate: Date | null = null;
  endDate: Date | null = null;
  sortType = 'ASC';
  sortColumn: string | null = null;
  isDownload = false;
  page = 1;

  // ── Mutable url (needs to be mutated per request) ─────────────────────────
  private currentUrl = '';

  // ── RxJS ─────────────────────────────────────────────────────────────────
  private readonly destroy$ = new Subject<void>();
  private readonly searchSubject = new Subject<{ event: any; key: string }>();

  readonly isMobile = computed(() =>
    /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
  );

  ngOnInit(): void {
    this.currentUrl = this.url();
    setTimeout(() => {
      this.currentUrl += `&sort_column=${this.sortColumn}&sort_type=${this.sortType}&download_csv=${this.isDownload}&pageNo=${this.page}&Limit=${this.pageSize}`;
      this.getTableData(this.currentUrl, {});
    }, 100);

    this.searchSubject
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(({ event, key }) => this.performSearch(event, key));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Data fetching ─────────────────────────────────────────────────────────
  getTableData(apiUrl: string, apiBody: any): void {
    const payload = { url: apiUrl, headers: this.headers(), body: apiBody };
    this.apiService.post(payload).then(
      (data: any) => {
        if (data?.result?.data) {
          this.isDownload = false;
          this.columns.set(data.result.config?.columns ?? []);
          const rows = data.result.data ?? [];
          this.tableDataCount.set(data.result.count ?? 0);
          if (data.result.filters) {
            this.filteredObjects.set(data.result.filters);
          }
          this.dataSource.data = rows;
          this.hasData.set(rows.length > 0);
          if (rows.length) {
            this.displayedColumns.set(this.columns().map((c: any) => c.key));
          }
        }
        this.cdr.markForCheck();
      },
      (error: any) => {
        console.error('GenericTable error:', error);
        this.cdr.markForCheck();
      }
    );
  }

  // ── Sorting ───────────────────────────────────────────────────────────────
  onSort(column: string): void {
    this.sortColumn = column;
    this.sortType = this.sortType === 'ASC' ? 'DESC' : 'ASC';
    this.currentUrl = this.currentUrl
      .replace(/sort_type=[^&]*/, `sort_type=${this.sortType}`)
      .replace(/sort_column=[^&]*/, `sort_column=${this.sortColumn}`)
      .replace(/pageNo=\d+/, `pageNo=${this.page}`);
    this.paginator.firstPage();
    this.getTableData(this.currentUrl, this.buildBody());
  }

  // ── Searching ─────────────────────────────────────────────────────────────
  onSearch(event: Event, key: string): void {
    const value = (event.target as HTMLInputElement).value;
    const valid = /^[a-zA-Z0-9]*$/.test(value);
    this.activeSearchColumn.set(key);
    this.isValidSearch.set(valid);
    if (valid) {
      this.searchSubject.next({ event, key });
    }
  }

  private performSearch(event: Event, key: string): void {
    const value = (event.target as HTMLInputElement).value;
    if (value.length) {
      this.searches[key] = [value];
    } else {
      delete this.searches[key];
    }
    this.paginator.firstPage();
    this.currentUrl = this.currentUrl.replace(/pageNo=\d+/, `pageNo=${this.page}`);
    this.getTableData(this.currentUrl, this.buildBody());
  }

  // ── Filtering ─────────────────────────────────────────────────────────────
  onFilter(event: any, key: string): void {
    let value = event.value;
    if (!Array.isArray(value)) value = [value];
    if (value?.length) {
      this.filters[key] = value;
    } else {
      delete this.filters[key];
    }
    this.paginator.firstPage();
    this.currentUrl = this.currentUrl.replace(/pageNo=\d+/, `pageNo=${this.page}`);
    this.getTableData(this.currentUrl, this.buildBody());
  }

  onDate(event: any, key: string): void {
    const selectedDate: Date | null = event?.target?.value ?? null;
    if (selectedDate) {
      const formatted = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
      this.filters[key] = [formatted];
    } else {
      delete this.filters[key];
    }
    this.paginator.firstPage();
    this.currentUrl = this.currentUrl.replace(/pageNo=\d+/, `pageNo=${this.page}`);
    this.getTableData(this.currentUrl, this.buildBody());
  }

  // ── Clear all filters ─────────────────────────────────────────────────────
  clearFilters(): void {
    this.searchValues = {};
    this.filterValues = {};
    this.dateFilters = {};
    this.filters = {};
    this.searches = {};
    this.sortColumn = null;
    this.sortType = 'ASC';
    this.isDownload = false;
    this.paginator.firstPage();
    this.currentUrl = this.currentUrl
      .replace(/(pageNo=\d+)/, `pageNo=${this.page}`)
      .replace(/(Limit=\d+)/, `&Limit=${this.pageSize}`);
    this.getTableData(this.currentUrl, {});
  }

  // ── Column helpers ────────────────────────────────────────────────────────
  getHeaderLabel(columnKey: string): string {
    const col = this.columns().find((c: any) => c.key === columnKey);
    return col?.label ?? columnKey;
  }

  isSearchable(columnKey: string): boolean {
    return !!this.columns().find((c: any) => c.key === columnKey)?.search;
  }

  isFilterable(columnKey: string): boolean {
    const col = this.columns().find((c: any) => c.key === columnKey);
    return !!(col && col.dataType !== 'Date' && col.filter);
  }

  getFilterOptions(columnKey: string): any[] {
    const col = this.columns().find((c: any) => c.key === columnKey);
    return col ? (this.filteredObjects()[col.key] ?? []) : [];
  }

  checkMultiple(columnKey: string): boolean {
    return !!this.columns().find((c: any) => c.key === columnKey)?.isMultipleFilter;
  }

  isDatePicker(columnKey: string): boolean {
    return !!this.columns().find((c: any) => c.key === columnKey && c.dataType === 'Date')?.filter;
  }

  // ── Popup (date-range download) ───────────────────────────────────────────
  openPopup(): void {
    this.showPopup.set(true);
  }

  closePopup(): void {
    this.showPopup.set(false);
    this.startDate = null;
    this.endDate = null;
    this.dateError.set(false);
    this.noData.set(false);
  }

  validateDates(): void {
    if (this.startDate && this.endDate) {
      this.dateError.set(this.endDate < this.startDate);
    } else {
      this.dateError.set(false);
    }
  }

  submitDates(): void {
    if (!this.dateError() && this.startDate && this.endDate) {
      const startEpoch = new Date(this.startDate.setHours(0, 0, 0, 0)).getTime() / 1000;
      const endEpoch = new Date(this.endDate.setHours(23, 59, 59, 0)).getTime() / 1000;
      this.downloadCSV(startEpoch, endEpoch);
    }
  }

  private downloadCSV(startDate: number, endDate: number): void {
    const csvUrl = this.currentUrl
      .replace(/start_date=[^&]*/, `start_date=${startDate}`)
      .replace(/end_date=[^&]*/, `end_date=${endDate}`)
      .replace(/download_csv=[^&]*/, 'download_csv=true');

    this.apiService.post({ url: csvUrl, body: this.buildBody(), headers: this.headers() })
      .then(async (data: any) => {
        if (data?.result?.reportsDownloadUrl) {
          this.noData.set(false);
          const timestamp = moment().format('DD-MM-YYYY_HH-mm-ss');
          if (this.isMobile()) {
            this.downloadEvent.emit({
              url: data.result.reportsDownloadUrl,
              fileName: `${this.title()}_${timestamp}`,
            });
          } else {
            try {
              const response = await fetch(data.result.reportsDownloadUrl);
              const blob = await response.blob();
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = `${this.title()}_${timestamp}.csv`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(link.href);
            } catch (err) {
              console.error('Error downloading report:', err);
            }
          }
          this.closePopup();
        } else {
          this.noData.set(true);
        }
      });
  }

  // ── Pagination ────────────────────────────────────────────────────────────
  onPageChange(event: { pageIndex: number }): void {
    this.page = event.pageIndex + 1;
    const currentPageSize = this.paginator.pageSize;
    this.currentUrl = this.currentUrl
      .replace(/pageNo=\d+/, `pageNo=${this.page}`)
      .replace(/Limit=\d+/, `Limit=${currentPageSize}`);
    this.getTableData(this.currentUrl, this.buildBody());
  }

  // ── Misc helpers ──────────────────────────────────────────────────────────
  hasFiltersData(): boolean {
    return Object.keys(this.filters).length > 0 || Object.keys(this.searches).length > 0;
  }

  compareWithArray(o1: any, o2: any): boolean {
    if (Array.isArray(o1) && Array.isArray(o2)) {
      return JSON.stringify(o1) === JSON.stringify(o2);
    }
    return o1 === o2;
  }

  formatDate(date: Date | null): string {
    return date ? (this.datePipe.transform(date, 'dd/MM/yyyy') ?? '') : '';
  }

  private buildBody(): { filters: Record<string, string[]>; search: Record<string, string[]> } {
    return { filters: this.filters, search: this.searches };
  }
}
