import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lib-dialog-input',
  templateUrl: './dialog-input.component.html',
  styleUrls: ['./dialog-input.component.css'],
})
export class DialogInputComponent implements OnInit {
  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  ngOnInit() {}
}
