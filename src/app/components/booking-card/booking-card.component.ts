import { Component, Input, OnInit } from '@angular/core';
import { Booking, BookingWithCar } from 'src/app/interfaces/booking';
import { Car } from 'src/app/interfaces/car';

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

  ngOnInit(): void {
    this.car = this.carBooking.car;
    this.booking = this.carBooking.booking;
    this.dateRange = [new Date(`${this.booking.date} ${this.booking.from_time}`), new Date(`${this.booking.date} ${this.booking.to_time}`)];
    this.duration = ((this.dateRange[1].getTime() - this.dateRange[0].getTime()) / 1000 / 60);
  }
}
