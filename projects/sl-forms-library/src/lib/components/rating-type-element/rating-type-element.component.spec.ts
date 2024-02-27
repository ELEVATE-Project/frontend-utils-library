import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingTypeElementComponent } from './rating-type-element.component';

describe('RatingTypeElementComponent', () => {
  let component: RatingTypeElementComponent;
  let fixture: ComponentFixture<RatingTypeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingTypeElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingTypeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
