/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SlFormComponent } from './sl-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

describe('SlFormComponent', () => {
  let component: SlFormComponent;
  let fixture: ComponentFixture<SlFormComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlFormComponent ],
      imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlFormComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with all form fields', () => {
    const firstNameField = compiled.querySelector('input[placeholder="First Name"]');
    const lastNameField = compiled.querySelector('input[placeholder="Last Name"]');
    const emailField = compiled.querySelector('input[name="email"]');
    const ratingField = compiled.querySelector('input[type="number"]');
    const suggestionField = compiled.querySelector('input[placeholder="Any Suggestion"]');
    
    expect(firstNameField).toBeTruthy();
    expect(lastNameField).toBeTruthy();
    expect(emailField).toBeTruthy();
    expect(ratingField).toBeTruthy();
    expect(suggestionField).toBeTruthy();
  });

  it('should have a submit button', () => {
    const submitButton = compiled.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
  });

});
