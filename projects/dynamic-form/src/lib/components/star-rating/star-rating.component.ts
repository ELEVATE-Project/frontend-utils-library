import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: StarRatingComponent,
    },
  ],
})
export class StarRatingComponent implements OnInit, ControlValueAccessor {
  @Input() starsCount: any;
  @Input() label: any;
  ratingList: any;
  rating = 0;
  touched: boolean = false;

  constructor() {}

  ngOnInit() {
    this.ratingList = [];
    for (let i = 0; i < this.starsCount; i++) {
      this.ratingList.push(i);
    }
  }

  onChange = (change: any) => {};

  onTouched = () => {};

  writeValue(value: number) {
    this.rating = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  onRatingChange(rate: any) {
    this.markAsTouched();
    this.rating = rate + 1;
    this.onChange(this.rating);
  }

  displayIcons(idx: number) {
    return this.rating && this.rating >= idx + 1 ? 'star' : 'star_border';
  }
}
