import { Injectable } from '@angular/core';

import customerJson from '../../assets/customers.json';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  customers: Customer[] = customerJson;

  constructor() { }

  public findCustomerId(): number {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      const customer = this.customers.find(customer => customer.username === username && customer.password === password);
      if (customer) {
        return customer.id;
      }
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
    return -1;
  }

  public login(username: string, password: string): boolean {
    const customer = this.customers.find(customer => customer.username === username && customer.password === password);
    if (customer) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      return true;
    }
    return false;
  }

  public logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

  public register(username: string, password: string, confirmPassword: string): [number, string] {
    if (password != confirmPassword) {
      return [1, 'Passwords do not match'];
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return [0, 'Username must contain only letters and numbers'];
    }
    const customer = this.customers.find(customer => customer.username === username);
    if (!customer) {
      this.customers.push({
        id: this.customers.length + 1,
        username: username,
        password: password
      });
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      return [-1, ''];
    }
    return [0, 'Username already exists'];
  }
}
