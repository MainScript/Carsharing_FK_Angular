import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, take } from 'rxjs';
import { Booking } from 'src/app/interfaces/booking';
import { Car } from 'src/app/interfaces/car';
import { BookingService } from 'src/app/services/booking.service';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';

@Component({
  selector: 'cs-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnDestroy {

  @Input() car: Car;
  @Input() dateRange: Date[];
  @Input() customerId: string;

  subscriptions: Subscription[] = [];

  constructor(public dialog: MatDialog, private bookingService: BookingService) { }


  onBook() {
    this.bookingService.getBookingsByCarId(this.car._id ?? '').pipe(take(1)).subscribe(bookings => {
      let dialogRef = this.dialog.open(BookingDialogComponent, {
        data: {
          car: this.car,
          bookings: bookings
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const booking: Booking = {
            customer_id: this.customerId,
            ...result,
          };
          this.bookingService.bookCar(result).subscribe((result: any) => {
            if (result.error) {
              console.log(result);
            }
          });
        }
      });
    });

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
