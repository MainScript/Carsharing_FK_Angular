import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Booking } from 'src/app/interfaces/booking';
import { Car } from 'src/app/interfaces/car';
import { BookingService } from 'src/app/services/booking.service';


interface intermediateData {
  date: string;
  from_time: string;
  to_time: string;
}

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

  availableData: intermediateData = {
    date: '',
    from_time: '',
    to_time: '',
  };
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { car: Car, bookings: Booking[] }, public dialogRef: MatDialogRef<BookingDialogComponent>, private bookingService: BookingService) { }
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
    const start_time = this.bookingForm.value.start_time;
    let start: Date;
    if (typeof start_time === 'string') {
      start = new Date(`01 Jan 1970 ${start_time}`);
    } else {
      const now = new Date();
      start = new Date(`01 Jan 1970 ${now.getHours()}:${now.getMinutes()}`);
    }

    const end_time = new Date(start.getTime() + (this.bookingForm.value.duration ?? 30) * 60000);
    const availableByTime = this.data.car.from_time.getTime() <= start.getTime() && this.data.car.to_time.getTime() >= end_time.getTime() && this.data.car.max_duration >= (this.bookingForm.value.duration ?? 30);
    if (!availableByTime) {
      return false;
    }


    this.availableData = {
      date: new Date(date).toDateString(),
      from_time: `${start.getHours()}:${start.getMinutes()}`,
      to_time: `${end_time.getHours()}:${end_time.getMinutes()}`,
    };

    if (this.data.bookings.length === 0) {
      return true;
    }

    

    const bookingsOnDate = this.data.bookings.filter(booking => {
      return new Date(booking.date).toDateString() === new Date(date).toDateString()
    });
    if (bookingsOnDate.length === 0) {
      return true;
    }
    const invalidBookings = bookingsOnDate.filter(booking => {
      const bookingStart = new Date(`01 Jan 1970 ${booking.from_time}`);
      const bookingEnd = new Date(`01 Jan 1970 ${booking.to_time}`);
      if (start.getTime() >= bookingStart.getTime() && start.getTime() <= bookingEnd.getTime()) {
        return true;
      }
      if (end_time.getTime() >= bookingStart.getTime() && end_time.getTime() <= bookingEnd.getTime()) {
        return true;
      }
      if (bookingStart.getTime() >= start.getTime() && bookingStart.getTime() <= end_time.getTime()) {
        return true;
      }
      if (bookingEnd.getTime() >= start.getTime() && bookingEnd.getTime() <= end_time.getTime()) {
        return true;
      }
    });
    if (invalidBookings.length > 0) {
      return false;
    }
    return true;
  }

  calculatePrice() {
    const duration = this.bookingForm.value.duration ?? 30;
    return this.data.car.price + (duration * this.data.car.ppm);
  }

  onBook() {
    const booking: Booking = {
      ...this.availableData,
      customer_id: '',
      price: this.priceTotal,
      car_id: this.data.car._id ?? '',
    };
    this.dialogRef.close(booking);
  }

  onCancel() {
    this.dialogRef.close(undefined);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
