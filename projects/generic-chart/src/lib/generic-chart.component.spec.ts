import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericChartComponent } from './generic-chart.component';

describe('GenericChartComponent', () => {
  let component: GenericChartComponent;
  let fixture: ComponentFixture<GenericChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
