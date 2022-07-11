import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarRaw } from '../interfaces/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  public getCars() {
    return this.http.get<CarRaw[]>('http://localhost:3000/api/cars');
  }


}
