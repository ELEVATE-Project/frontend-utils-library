import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-generic-table',
  standalone: true,
  imports: [],
  template: `
    <p>
      generic-table works!
    </p>
  `,
  styles: [
  ]
})
export class GenericTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
