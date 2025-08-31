import { NgModule } from '@angular/core';
import { GenericChartComponent } from './generic-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { ChartComponent } from './components/chart/chart.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    GenericChartComponent,
    BarChartComponent,
    LineChartComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    GenericChartComponent,
    BarChartComponent,
    LineChartComponent,
    ChartComponent
  ]
})
export class GenericChartModule { }
