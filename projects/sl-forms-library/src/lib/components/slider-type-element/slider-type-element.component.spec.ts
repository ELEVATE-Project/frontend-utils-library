import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderTypeElementComponent } from './slider-type-element.component';

describe('SliderTypeElementComponent', () => {
  let component: SliderTypeElementComponent;
  let fixture: ComponentFixture<SliderTypeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderTypeElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderTypeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
