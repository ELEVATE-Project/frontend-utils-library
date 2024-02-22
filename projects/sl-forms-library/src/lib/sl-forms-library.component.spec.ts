import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlFormsLibraryComponent } from './sl-forms-library.component';

describe('SlFormsLibraryComponent', () => {
  let component: SlFormsLibraryComponent;
  let fixture: ComponentFixture<SlFormsLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlFormsLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlFormsLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
