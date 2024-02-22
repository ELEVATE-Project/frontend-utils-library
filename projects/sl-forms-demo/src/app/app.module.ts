import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsDemoImplemetationComponent } from './forms-demo-implemetation/forms-demo-implemetation.component';

@NgModule({
  declarations: [
    AppComponent,
    FormsDemoImplemetationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
