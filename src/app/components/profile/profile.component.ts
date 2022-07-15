import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Booking, BookingWithCar } from 'src/app/interfaces/booking';
import { Car } from 'src/app/interfaces/car';
import { Customer } from 'src/app/interfaces/customer';
import { CarPipe } from 'src/app/pipes/car.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'cs-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  bookings: Booking[] = [];
  
  customer: Customer = {
    _id: '',
    username: '',
    password: '',
  };

  pastCars: BookingWithCar[] = [];
  currentCars: BookingWithCar[] = [];

  totalCost: number;
  averageCost: number;


  constructor(private authService: AuthService, private bookingService: BookingService, private carService: CarService) { }

  ngOnInit(): void {
    const now = new Date();
    const interval = setInterval(() => {
      if (this.authService.getCustomer()) {
        clearInterval(interval);
        this.customer = this.authService.getCustomer() as Customer;
        this.bookingService.getBookingsByCustomerId(this.customer._id).pipe(take(1)).subscribe(bookings => {
          this.bookings = bookings;
          this.getPastBookings();
          this.getCurrentBookings();
          this.totalCost = this.bookings.reduce((acc, booking) => {
            return acc + booking.price;
          }, 0);
          this.averageCost = this.totalCost / (this.bookings.length || 1);
        });
      }
      if (new Date().getTime() - now.getTime() > 1000) {
        clearInterval(interval);
        this.customer.username = 'There has been an error';
      }
    }, 100);
  }

  getPastBookings() {
    const pastBookings = this.bookings.filter(booking => {
      const bookingTime = new Date(`${booking.date} ${booking.to_time}`);
      const now = new Date();
      return bookingTime.getTime() < now.getTime();
    });
    const carPipe = new CarPipe();
    this.carService.getCarsById(pastBookings.map(booking => booking.car_id)).pipe(take(1)).subscribe(cars => {
      const onlyCars = carPipe.transform(cars);
      this.pastCars = pastBookings.map(booking => {
        return {
          booking: booking,
          car: onlyCars.find(car => car._id === booking.car_id) as Car
        };
      });
    });
  }

  getCurrentBookings() {
    const currentBookings = this.bookings.filter(booking => {
      const bookingTime = new Date(`${booking.date} ${booking.to_time}`);
      const now = new Date();
      return bookingTime.getTime() > now.getTime();
    });
    const carPipe = new CarPipe();
    this.carService.getCarsById(currentBookings.map(booking => booking.car_id)).pipe(take(1)).subscribe(cars => {
      const onlyCars = carPipe.transform(cars);
      this.currentCars = currentBookings.map(booking => {
        return {
          booking: booking,
          car: onlyCars.find(car => car._id === booking.car_id) as Car
        };
      });
    });
  }
}
