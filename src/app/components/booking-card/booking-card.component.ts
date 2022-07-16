import { Component, Input, OnInit } from '@angular/core';
import { Booking, BookingWithCar } from 'src/app/interfaces/booking';
import { Car } from 'src/app/interfaces/car';
import { DatetimePipe } from 'src/app/pipes/datetime.pipe';

@Component({
  selector: 'cs-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss']
})
export class BookingCardComponent implements OnInit {

  @Input() carBooking: BookingWithCar;
  dateRange: Date[];

  car: Car;
  booking: Booking;
  duration: number;

  constructor(private dateTimePipe: DatetimePipe) { }

  ngOnInit(): void {
    this.car = this.carBooking.car;
    this.booking = this.carBooking.booking;
    this.dateRange = [new Date(`${this.booking.date} ${this.booking.from_time}`), new Date(`${this.booking.date} ${this.booking.to_time}`)];
    this.duration = this.dateTimePipe.timeRangeToMinutes(this.dateRange);
  }
}
