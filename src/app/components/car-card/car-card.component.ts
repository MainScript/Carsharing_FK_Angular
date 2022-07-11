import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/interfaces/car';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';

@Component({
  selector: 'cs-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnDestroy {

  @Input() car: Car;
  @Input() dateRange: Date[];
  @Input() customerId: number;

  subscriptions: Subscription[] = [];

  constructor(public dialog: MatDialog) { }


  onBook() {
    let dialogRef = this.dialog.open(BookingDialogComponent, {
      data: this.car,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
