import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from 'src/app/interfaces/car';

@Component({
  selector: 'cs-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent {

  priceTotal: number = 0;
  duration: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { car: Car, dateRange: Date[] }, public dialogRef: MatDialogRef<BookingDialogComponent>) { }

  ngOnInit(): void {
    this.duration = Math.ceil(((this.data.dateRange[1].getTime() + 1) - this.data.dateRange[0].getTime()) / (1000 * 60 * 60 * 24));
    this.priceTotal = this.data.car.price * this.duration;
  }

  onBook() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}
