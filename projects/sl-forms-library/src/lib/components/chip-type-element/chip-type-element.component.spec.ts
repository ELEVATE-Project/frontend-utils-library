import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipTypeElementComponent } from './chip-type-element.component';

describe('ChipTypeElementComponent', () => {
  let component: ChipTypeElementComponent;
  let fixture: ComponentFixture<ChipTypeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipTypeElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipTypeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
