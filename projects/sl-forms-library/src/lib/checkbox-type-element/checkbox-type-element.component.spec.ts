import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxTypeElementComponent } from './checkbox-type-element.component';

describe('CheckboxTypeElementComponent', () => {
  let component: CheckboxTypeElementComponent;
  let fixture: ComponentFixture<CheckboxTypeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxTypeElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxTypeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
