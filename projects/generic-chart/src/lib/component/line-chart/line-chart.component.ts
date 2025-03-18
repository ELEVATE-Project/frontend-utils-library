import { Component, Input, AfterViewInit, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'lib-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'], 
})
export class LineChartComponent implements AfterViewInit, OnChanges {
  @Input() data: any; 
  private chart: Chart | undefined;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.data) {
      this.initializeChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && !changes['data'].isFirstChange()) {
      this.updateChart();
    }
  }
  private initializeChart() {
    const chartElement = document.getElementById('line') as HTMLCanvasElement;
    if (!chartElement) {
      console.error('Chart element not found');
      return;
    }
    this.chart = new Chart(chartElement, {
      type: 'line',
      data: this.data,
      options: {
        responsive: true,
        scales: {
          x: {},
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    this.cdr.detectChanges();
  }

  private updateChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    this.initializeChart();
  }
}
