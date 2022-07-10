import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from 'src/app/interfaces/car';

@Component({
  selector: 'cs-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Car) { }

  ngOnInit(): void {
  }

}
