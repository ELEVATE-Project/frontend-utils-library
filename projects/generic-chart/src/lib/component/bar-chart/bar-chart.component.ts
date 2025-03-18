import { Component, Input, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'lib-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit, OnDestroy {
  @Input() data: any;
  private chart: Chart | undefined;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.data) {
      this.initializeChart();
    }
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnChanges() {
    if (this.chart) {
      this.chart.destroy();
    }

    if (this.data) {
      this.initializeChart();
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  private initializeChart() {
    const chartElement = document.getElementById('MyChart') as HTMLCanvasElement;
    if (chartElement) {
      this.chart = new Chart(chartElement, {
        type: 'bar',
        data: this.data,
        options: {
          responsive: true,
          scales: {
            x: {},
            y: {
              beginAtZero: true
            }
          }
        }
      });
      this.cdr.detectChanges();
    }
  }

  private onResize() {
    if (this.chart) {
      this.chart.resize();
    }
  }
}
