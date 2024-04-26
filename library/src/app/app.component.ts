import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SlFormComponent } from './sl-form/sl-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , SlFormComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'library';
}
