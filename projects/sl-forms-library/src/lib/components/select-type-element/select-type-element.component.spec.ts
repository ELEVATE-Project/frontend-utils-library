import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTypeElementComponent } from './select-type-element.component';

describe('SelectTypeElementComponent', () => {
  let component: SelectTypeElementComponent;
  let fixture: ComponentFixture<SelectTypeElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTypeElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTypeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
