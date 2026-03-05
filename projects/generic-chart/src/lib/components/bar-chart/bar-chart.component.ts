import { Component, OnChanges, AfterViewInit, DestroyRef, inject, input, signal } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { GenericChartService } from '../../generic-chart.service';

@Component({
  selector: 'lib-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit, OnChanges {
  readonly url = input<any>();
  readonly headers = input<any>();
  readonly legends = input<any>();
  readonly sessionType = input<any>();
  readonly chartBody = input<any>();
  readonly scrollLabel = input<any>();

  data = signal<any>(null);
  isMobile = signal<boolean>(false);
  hasData = signal<boolean>(false);

  private chart: Chart | undefined;
  private readonly apiService = inject(GenericChartService);
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit() {
    this.isMobile.set(window.innerWidth < 768);
    setTimeout(() => {
      this.getChartData();
    }, 100);

    const onResize = this.onResize.bind(this);
    window.addEventListener('resize', onResize);
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', onResize);
    });
  }

  ngOnChanges() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }

    if (this.url() && this.headers()) {
      this.initializeChart();
    }
  }

  async getChartData() {
    const payload = { url: this.url(), headers: this.headers(), entityType: this.chartBody() };
    const params = new URL(this.url()).searchParams;
    const groupBy = params.get('group_by');
    this.apiService.post(payload).then(async (responseData: any) => {
      const showMonthName: boolean = groupBy === 'month';
      this.data.set(await this.apiService.transformApiResponse(responseData, this.legends(), showMonthName));
      this.initializeChart();
    });
  }

  private initializeChart() {
    const chartElement = document.getElementById('MyChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
    const currentData = this.data();
    this.hasData.set(currentData ? this.checkIfAnyDataExists(currentData?.datasets) : true);

    if (!this.hasData()) {
      const containerElement = document.getElementById('chartContainer');
      if (containerElement) {
        containerElement.innerHTML = '<h1 class="no-data-row">No sessions</h1>';
      }
      return;
    }

    if (chartElement) {
      const dataLength = currentData.labels?.length || 0;
      const canvasParent = document.getElementById('chartContainer');
      if (canvasParent) {
        const chartWidth = dataLength * (this.isMobile() ? 40 : 25);
        chartElement.style.width = `${chartWidth}px`;
      }

      this.chart = new Chart(chartElement, {
        type: 'bar',
        data: {
          ...currentData,
          datasets: currentData.datasets.map((dataset: any) => ({
            ...dataset,
            barThickness: this.isMobile() ? 10 : 20,
            gap: 3
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'end',
              labels: {
                boxWidth: 12,
                boxHeight: 12,
                padding: 9,
                font: { size: 13 },
              },
            },
          },
          scales: {
            x: {
              ticks: {
                autoSkip: false,
              },
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
          layout: {
            padding: { right: 20 },
          },
        },
      });
    }
  }

  private onResize() {
    if (this.chart) {
      this.chart.resize();
    }
  }

  checkIfAnyDataExists(datasets: { label: string; data: number[] }[]): boolean {
    return datasets.some(dataset => dataset?.data.some(value => value > 0));
  }
}
