import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as index from '.';
import * as material from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CarCardComponent } from './components/car-card/car-card.component';
import { CarPipe } from './pipes/car.pipe';
import { BookingDialogComponent } from './components/booking-dialog/booking-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ...index.components,
    CarCardComponent,
    CarPipe,
    BookingDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...material.MaterialComponents
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }