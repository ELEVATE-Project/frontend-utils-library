import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTypeElementComponent } from './date-type-element.component';

describe('DateTypeElementComponent', () => {
  let component: DateTypeElementComponent;
  let fixture: ComponentFixture<DateTypeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateTypeElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateTypeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
