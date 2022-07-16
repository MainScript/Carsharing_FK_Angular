import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Booking } from 'src/app/interfaces/booking';
import { Car, CarRaw } from 'src/app/interfaces/car';
import { DatetimePipe } from 'src/app/pipes/datetime.pipe';

@Component({
  selector: 'cs-add-car-dialog',
  templateUrl: './add-car-dialog.component.html',
  styleUrls: ['./add-car-dialog.component.scss']
})
export class AddCarDialogComponent {

  basicInfos = new FormGroup({
    make: new FormControl('', [ Validators.required ]),
    model: new FormControl('', [ Validators.required ]),
    year: new FormControl(new Date().getFullYear(), [ Validators.required ]),
    fuel: new FormControl('', [ Validators.required ]),
  });

  priceInfos = new FormGroup({
    price: new FormControl(0, [ Validators.required ]),
    ppm: new FormControl(0, [ Validators.required ]),
  });

  timeInfos = new FormGroup({
      max_duration: new FormControl(30, [ Validators.required ]),
      from_time: new FormControl(new Date(), [ Validators.required ]),
      to_time: new FormControl(new Date(), [ Validators.required ]),
  });

  subscriptions: Subscription[] = [];

  dateTimePipe: DatetimePipe;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { car: Car, bookings: Booking[] }, public dialogRef: MatDialogRef<AddCarDialogComponent>) {
    this.dateTimePipe = new DatetimePipe();
   }

  addCar() {
    const start = this.dateTimePipe.transform(this.timeInfos.value.from_time as Date);
    const end = this.dateTimePipe.transformEnd(this.timeInfos.value.to_time as Date, start);
    const result: CarRaw = {
      make: this.basicInfos.value.make as string,
      model: this.basicInfos.value.model as string,
      year: this.basicInfos.value.year as number,
      fuel: this.basicInfos.value.fuel as string,
      price: this.priceInfos.value.price as number,
      ppm: this.priceInfos.value.ppm as number,
      max_duration: this.timeInfos.value.max_duration as number,
      from_time: start,
      to_time: end,
    };
    this.dialogRef.close(result);
  }
}
