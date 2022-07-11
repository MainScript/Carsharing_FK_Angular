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
    this.updateForm();
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
    let start = this.bookingForm.value.start_time ?? new Date();
    start = new Date(`01 Jan 1970 ${start.getHours()}:${start.getMinutes()}`);
    const end_time = new Date(start.getTime() + (this.bookingForm.value.duration ?? 30) * 60000);
    return this.data.from_time.getTime() <= start.getTime() && this.data.to_time.getTime() >= end_time.getTime() && this.data.max_duration >= (this.bookingForm.value.duration ?? 30);
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
