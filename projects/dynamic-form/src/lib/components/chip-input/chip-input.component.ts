import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogInputComponent } from '../dialog-input/dialog-input.component';

@Component({
  selector: 'lib-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChipInputComponent,
      multi: true,
    },
  ],
})
export class ChipInputComponent implements OnInit, ControlValueAccessor {
  @Input() chipControl: any;
  selectedChips: any;
  enableSelectAll: boolean = false;
  touched: boolean = false;

  constructor(private diaglog: MatDialog) {}

  onChange = (value: any) => {};

  onTouched = () => {};

  ngOnInit() {}

  writeValue(value: any) {
    this.selectedChips = new Set();
    this.chipControl.options.map((chipItem: any) => {
      if (value) {
        value.forEach((val: any) => {
          if (val.value == chipItem.value) {
            this.selectedChips.add(chipItem);
          }
        });
      }
    });

    if (this.selectedChips.size === this.chipControl.options.length) {
      this.enableSelectAll = true;
    }
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

  onChipClick(chip: any) {
    this.markAsTouched();
    if (this.selectedChips.has(chip)) {
      this.selectedChips.delete(chip);
    } else {
      this.selectedChips.add(chip);
    }
    if (this.selectedChips.size) {
      this.onChange([...this.selectedChips]);
    } else {
      this.onChange([]);
    }

    this.enableSelectAll =
      this.selectedChips.size == this.chipControl.options.length;
  }

  addOption() {
    const dialogRef = this.diaglog.open(DialogInputComponent, {
      data: {
        header: this.chipControl.meta.addNewPopupHeader,
        label: this.chipControl.meta.addNewPopupSubHeader,
        required: true,
        maxLength: 20,
        buttonText: {
          ok: 'Add',
          cancel: 'Cancel',
        },
      },
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data && data !== '') {
        let newOption = {
          label: data,
          value: data,
        };
        this.chipControl.options.push(newOption);
        this.onChipClick(newOption);
      }
    });
  }

  toggleSelectAll() {
    this.markAsTouched();
    if (this.enableSelectAll) {
      this.chipControl.options.map((chipItem: any) => {
        this.selectedChips.add(chipItem);
      });
    } else {
      this.selectedChips.clear();
    }

    if (this.selectedChips.size) {
      this.onChange([...this.selectedChips]);
    } else {
      this.onChange([]);
    }
  }
}
