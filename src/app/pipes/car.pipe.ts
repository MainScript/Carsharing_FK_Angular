import { Pipe, PipeTransform } from '@angular/core';
import { Car, CarRaw, FuelSelection } from '../interfaces/car';

@Pipe({
  name: 'carPipe'
})
export class CarPipe implements PipeTransform {

  transform(value: CarRaw[]): Car[] {
    return value.map(car => {
      return {
        id: car.id,
        make: car.make,
        model: car.model,
        year: car.year,
        fuel: car.fuel,
        price: car.price,
        from: new Date(car.from),
        to: new Date(car.to)
      };
    });
  }

  search(cars: Car[], search?: string): Car[] {
    if (!search) {
      return cars;
    }
    return cars.filter(car => {
      return car.make.toLowerCase().includes(search.toLowerCase()) || car.model.toLowerCase().includes(search.toLowerCase());
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

  filterByDate(cars: Car[], dateRange: Date[]): Car[] {
    return cars.filter(car => {
      return car.from <= dateRange[0] && car.to >= dateRange[1];
    });
  }

  filter(cars: CarRaw[], fuel?: FuelSelection, search?: string, dateRange?: Date[]): Car[] {
    let filteredCars = this.transform(cars);
    filteredCars = this.search(filteredCars, search);
    filteredCars = this.filterByFuel(filteredCars, fuel ?? { electric: false, petrol: false, diesel: false });
    filteredCars = this.filterByDate(filteredCars, dateRange ?? [new Date(), new Date()]);
    return filteredCars;    
  }
}
