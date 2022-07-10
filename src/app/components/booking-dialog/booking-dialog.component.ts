import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/interfaces/car';

@Component({
  selector: 'cs-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent implements OnInit, OnDestroy {

  priceTotal: number = 0;
  duration: number = 0;

  available: boolean = false;

  subscriptions: Subscription[] = [];

  bookingForm = new FormGroup({
    date: new FormControl(new Date()),
    start_time: new FormControl(new Date()),
    duration: new FormControl(30),
  });
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Car, public dialogRef: MatDialogRef<BookingDialogComponent>) { }
  ngOnInit(): void {
    this.subscriptions.push(this.bookingForm.valueChanges.subscribe(value => {
      this.priceTotal = this.calculatePrice();
    }
    ));
  }

  updateForm() {
    if (this.checkAvailable) {
      this.available = true;
      this.priceTotal = this.calculatePrice();
    } else {
      this.available = false;
    }
  }

  get checkAvailable() {
    const date = this.bookingForm.value.date ?? new Date();
    const start_time = new Date(`01 Jan 1970 ${this.bookingForm.value.start_time}`) ?? new Date();
    const end_time = new Date(start_time.getTime() + (this.bookingForm.value.duration ?? 30) * 60000);
    return this.data.from_date <= date && this.data.to_date >= date && this.data.from_time <= start_time && this.data.to_time >= end_time && this.data.max_duration >= (this.bookingForm.value.duration ?? 30);
  }

  calculatePrice() {
    const duration = this.bookingForm.value.duration ?? 30;
    return this.data.price + (duration * this.data.ppm);
  }

  onBook() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
