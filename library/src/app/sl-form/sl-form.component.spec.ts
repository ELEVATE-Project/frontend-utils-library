import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlFormComponent } from './sl-form.component';

describe('SlFormComponent', () => {
  let component: SlFormComponent;
  let fixture: ComponentFixture<SlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
