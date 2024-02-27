import { TestBed } from '@angular/core/testing';

import { SlFormsLibraryService } from './sl-forms-library.service';

describe('SlFormsLibraryService', () => {
  let service: SlFormsLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlFormsLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
