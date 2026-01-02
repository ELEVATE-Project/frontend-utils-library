import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTableCompComponent } from './generic-table-comp.component';

describe('GenericTableCompComponent', () => {
  let component: GenericTableCompComponent;
  let fixture: ComponentFixture<GenericTableCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericTableCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericTableCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
