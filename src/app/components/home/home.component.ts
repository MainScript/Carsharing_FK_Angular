import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Car, CarRaw, FuelSelection } from '../../interfaces/car';
import CarsJson from '../../../assets/cars.json';
import { CarPipe } from 'src/app/pipes/car.pipe';


@Component({
  selector: 'cs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  fuelselection = new FormGroup({
    electric: new FormControl(false),
    petrol: new FormControl(false),
    diesel: new FormControl(false),
  });

  maxOnPage = 10;

  carsRaw: CarRaw[] = CarsJson;
  cars: Car[] = [];
  shownCars: Car[];
  carsPipe: CarPipe;

  from: Date;
  to: Date;

  constructor() { 
    this.carsPipe = new CarPipe();
  }

  searchCars(search?: string) {
    let fromInput = document.getElementById('fromInp') as HTMLInputElement;
    let toInput = document.getElementById('toInp') as HTMLInputElement;
    let now = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let fromOld = fromInput.value == '' ? now : new Date(fromInput.value);
    let toOld = toInput.value == '' ? new Date(fromOld.getTime() + 86400000) : new Date(toInput.value);

    this.from = new Date(Math.min(fromOld.getTime(), toOld.getTime()));
    this.to = new Date(Math.max(fromOld.getTime(), toOld.getTime()));

    this.cars = this.carsPipe.filter(this.carsRaw,  this.fuelselection.getRawValue() as FuelSelection, search ?? '', [this.from, this.to]);
    this.showCars();
  }

  ngOnInit(): void {
    this.cars = this.carsPipe.transform(this.carsRaw);
    this.searchCars();
    this.showCars();
  }

  onShowMore() {
    this.maxOnPage += 10;
    if (this.maxOnPage > this.cars.length) {
      this.maxOnPage = this.cars.length;
    }
    this.showCars();
  }

  showCars() {
    this.shownCars = this.cars.slice(0, this.maxOnPage);
  }
}
