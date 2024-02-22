import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleTypeElementComponent } from './toggle-type-element.component';

describe('ToggleTypeElementComponent', () => {
  let component: ToggleTypeElementComponent;
  let fixture: ComponentFixture<ToggleTypeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleTypeElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleTypeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
