import { Component, OnChanges, AfterViewInit, DestroyRef, inject, input } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'lib-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements AfterViewInit, OnChanges {
  readonly data = input<any>();

  private chart: Chart | undefined;
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit() {
    if (this.data()) {
      this.initializeChart();
    }

    const onResize = this.onResize.bind(this);
    window.addEventListener('resize', onResize);
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', onResize);
    });
  }

  ngOnChanges() {
    if (this.chart) {
      this.chart.destroy();
    }

    if (this.data()) {
      this.initializeChart();
    }
  }

  private initializeChart() {
    const chartElement = document.getElementById('MyLineChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
    }
    if (chartElement) {
      this.chart = new Chart(chartElement, {
        type: 'line',
        data: this.data(),
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
    }
  }

  private onResize() {
    if (this.chart) {
      this.chart.resize();
    }
  }
}
