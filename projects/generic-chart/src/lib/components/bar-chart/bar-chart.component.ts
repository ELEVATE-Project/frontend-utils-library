import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { GenericChartService } from '../../generic-chart.service';

@Component({
  selector: 'lib-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() url: any;
  @Input() headers: any;
  @Input() legends :any;
  @Input() sessionType :any;
  @Input() chartBody: any;
  @Input() scrollLabel: any;
data : any
isMobile : boolean = false;
  private chart: Chart | undefined;
  hasData: any = false;
  constructor(private cdr: ChangeDetectorRef, private apiService : GenericChartService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.isMobile = window.innerWidth < 768;
    let url = this.url;
    let headers = this.headers;
      setTimeout(() => {
        this.getChartData();
        // this.initializeChart();
      }, 100);
          window.addEventListener('resize', this.onResize.bind(this));
        }

  ngOnChanges() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }

    if (this.url && this.headers) {
      this.initializeChart();
    }
  }

  async getChartData(){
    const paylaod  ={url : this.url, headers : this.headers, entityType: this.chartBody}
    const params = new URL(this.url).searchParams;
    const groupBy = params.get('group_by');
    this.apiService.post(paylaod).then(async (data: any) => {
      let showMonthName : boolean = false;
      if(groupBy == "month"){
        showMonthName = true;
      }
     this.data = await this.apiService.transformApiResponse(data,this.legends, showMonthName);
      this.initializeChart();
    })
  }

  private initializeChart() {
    const chartElement = document.getElementById('MyChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
    this.hasData = this.data ? this.checkIfAnyDataExists(this.data?.datasets): true;
    if (!this.hasData) {
      const containerElement = document.getElementById('chartContainer');
      if (containerElement) {
        containerElement.innerHTML = '<h1 style="color: #832215; background-color: #f8f9fa; text-align: center; padding: 20px 0; width: 100%;">No sessions</h1>';
      }
      return;
    }
  
    if (chartElement) {
      const dataLength = this.data.labels?.length || 0;
      const canvasParent = document.getElementById('chartContainer');
      if (canvasParent) {
        const chartWidth = dataLength * (this.isMobile ? 40 : 25); // tweak per bar width
        chartElement.style.width = `${chartWidth}px`;
      }
    
      this.chart = new Chart(chartElement, {
        type: 'bar',
        data: {
          ...this.data,
          datasets: this.data.datasets.map((dataset: any) => ({
            ...dataset,
            barThickness: this.isMobile ? 10 : 20,
            gap:3
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
                autoSkip: false, // 👈 ensures all labels show
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
    
      this.cdr.detectChanges();
    }
  }
  

  private onResize() {
    if (this.chart) {
      this.chart.resize();
    }
  }
  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  checkIfAnyDataExists(datasets: { label: string; data: number[] }[]): boolean {
    return datasets.some(dataset => dataset?.data.some(value => value > 0));
  }

}
