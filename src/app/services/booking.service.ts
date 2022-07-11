import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../interfaces/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookings: Booking[] = [];

  constructor(private http: HttpClient) { }

  getBookings() {
    return this.http.get<Booking[]>('http://localhost:3000/api/bookings');
  }

  getBookingsByCustomerId(customerId: string) {
    return this.http.get<Booking[]>('http://localhost:3000/api/bookingsCustomer/' + customerId);
  }

  getBookingsByCarId(carId: string) {
    return this.http.get<Booking[]>('http://localhost:3000/api/bookingsCar/' + carId);
  }

  bookCar(booking: Booking) {
    return this.http.post('http://localhost:3000/api/booking', booking);
  }
}
