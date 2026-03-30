import { NgModule } from '@angular/core';
import { GenericChartComponent } from './generic-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { ChartComponent } from './components/chart/chart.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    GenericChartComponent,
    BarChartComponent,
    LineChartComponent,
    ChartComponent
  ],
  providers: [
    provideHttpClient()
  ],
  exports: [
    GenericChartComponent,
    BarChartComponent,
    LineChartComponent,
    ChartComponent
  ]
})
export class GenericChartModule { }
