import { TestBed } from '@angular/core/testing';

import { GenericChartService } from './generic-chart.service';

describe('GenericChartService', () => {
  let service: GenericChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
