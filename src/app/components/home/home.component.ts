import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Car, CarRaw, FuelSelection } from '../../interfaces/car';
import CarsJson from '../../../assets/cars.json';
import { CarPipe } from 'src/app/pipes/car.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { HttpClient } from '@angular/common/http';


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

  durationForm = new FormGroup({
    from: new FormControl(new Date()),
    duration: new FormControl(30),
  });

  searchbar = new FormGroup({
    search: new FormControl(''),
  });

  maxOnPage = 10;

  customerId = -1;

  carsRaw: CarRaw[] = [];
  cars: Car[] = [];
  shownCars: Car[];
  carsPipe: CarPipe;

  from: Date;
  to: Date;

  carService: CarService;

  constructor(private authService: AuthService, http: HttpClient) { 
    this.carsPipe = new CarPipe();
    this.carService = new CarService(http);
  }

  searchCars(search?: string) {
    let fromInput = document.getElementById('fromInp') as HTMLInputElement;
    let now = new Date();
    now = new Date(`01 Jan 1970 ${now.getHours()}:${now.getMinutes()}`);
    this.from = fromInput.value == '' ? now : new Date(`01 Jan 1970 ${fromInput.value}`);
    this.to = new Date(this.from.getTime() + (this.durationForm.value.duration ?? 30) * 60 * 1000);

    this.cars = this.carsPipe.filter(this.carsRaw,  this.fuelselection.getRawValue() as FuelSelection, this.searchbar.value.search ?? '', [this.from, this.to]);
    this.showCars();
  }

  ngOnInit(): void {
    this.carService.getCars().subscribe(cars => {
      this.carsRaw = cars;
      this.cars = this.carsPipe.transform(this.carsRaw);
      this.searchCars();
      this.showCars();
      const customer = this.authService.getCustomer();
      if (customer) {
        this.customerId = customer.id;
      }
    });
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
