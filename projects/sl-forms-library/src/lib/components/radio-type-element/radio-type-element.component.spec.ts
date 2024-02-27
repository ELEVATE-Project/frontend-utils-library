import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioTypeElementComponent } from './radio-type-element.component';

describe('RadioTypeElementComponent', () => {
  let component: RadioTypeElementComponent;
  let fixture: ComponentFixture<RadioTypeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioTypeElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioTypeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
