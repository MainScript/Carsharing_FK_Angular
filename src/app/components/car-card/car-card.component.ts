import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Car } from 'src/app/interfaces/car';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';

@Component({
  selector: 'cs-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnInit {

  @Input() car: Car;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onBook() {
    this.dialog.open(BookingDialogComponent, {
      data: this.car,
    });
  }

}
