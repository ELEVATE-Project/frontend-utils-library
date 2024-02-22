import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaElementComponent } from './text-area-element.component';

describe('TextAreaElementComponent', () => {
  let component: TextAreaElementComponent;
  let fixture: ComponentFixture<TextAreaElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAreaElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAreaElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
