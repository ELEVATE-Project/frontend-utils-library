import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './component/chart/chart.component';
import { GenericChartComponent } from './generic-chart.component';
import { BarChartComponent } from './component/bar-chart/bar-chart.component';
import { LineChartComponent } from './component/line-chart/line-chart.component';

@NgModule({
  declarations: [
    ChartComponent,
    GenericChartComponent,
    BarChartComponent,
    LineChartComponent
  ],
  imports: [
    CommonModule,
  ],
  schemas:[NO_ERRORS_SCHEMA],
  exports:[ChartComponent, LineChartComponent, BarChartComponent]
})
export class GenericChartModule {}
