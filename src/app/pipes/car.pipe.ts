import { Pipe, PipeTransform } from '@angular/core';
import { Car, CarRaw, FuelSelection } from '../interfaces/car';

@Pipe({
  name: 'carPipe'
})
export class CarPipe implements PipeTransform {

  transform(value: CarRaw[]): Car[] {
    return value.map(car => {
      return {
        _id: car._id,
        make: car.make,
        model: car.model,
        year: car.year,
        fuel: car.fuel,
        price: car.price,
        ppm: car.ppm,
        max_duration: car.max_duration,
        from_time: new Date(`01 Jan 1970 ${car.from_time}`),
        to_time: new Date(`01 Jan 1970 ${car.to_time}`),
      };
    });
  }

  search(cars: Car[], search?: string): Car[] {
    if (!search) {
      return cars;
    }
    return cars.filter(car => {
      const name = car.make + ' ' + car.model;
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }

  filterByFuel(cars: Car[], fuel: FuelSelection): Car[] {
    if ((fuel.electric && fuel.petrol && fuel.diesel) || (!fuel.electric && !fuel.petrol && !fuel.diesel)) {
      return cars;
    }
    return cars.filter(car => {
      return (fuel.electric && car.fuel === 'electric') || (fuel.petrol && car.fuel === 'petrol') || (fuel.diesel && car.fuel === 'diesel');
    });
  }

  filterByTime(cars: Car[], timeRange?: Date[]): Car[] {
    if (!timeRange) {
      return cars;
    }
    return cars.filter(car => {
      return car.from_time.getTime() >= timeRange[0].getTime() && car.to_time.getTime() >= timeRange[1].getTime() && car.max_duration >= (timeRange[1].getTime() - timeRange[0].getTime()) / 1000 / 60;
    });
  }

  filter(cars: CarRaw[], fuel?: FuelSelection, search?: string, timeRange?: Date[]): Car[] {
    let filteredCars = this.transform(cars);
    filteredCars = this.search(filteredCars, search);
    filteredCars = this.filterByFuel(filteredCars, fuel ?? { electric: false, petrol: false, diesel: false });
    filteredCars = this.filterByTime(filteredCars, timeRange);
    return filteredCars;    
  }
}
