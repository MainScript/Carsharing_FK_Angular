import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  customers: Customer[] = [];

  customersSubscription: any;

  constructor(private http: HttpClient) {
    this.customersSubscription = this.http.get<Customer[]>('http://localhost:3000/api/customers').pipe(take(1)).subscribe(customers => {
      this.customers = customers;
    });
  }

  private findCustomer(username: string, password?: string): Customer | undefined {
    if (this.customers.length == 0) {
      return undefined;
    }
    if (password) {
      return this.customers.find(customer => customer.username === username && customer.password === password);
    } else {
      return this.customers.find(customer => customer.username === username);
    }
  }

  public getCustomer(): Customer | undefined {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      const customer = this.findCustomer(username, password);
      if (customer) {
        return customer;
      }
    }
    return undefined;
  }

  public login(username: string, password: string): boolean {
    const customer = this.findCustomer(username, password);
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
    const customer = this.findCustomer(username);
    if (!customer) {
      this.http.post('http://localhost:3000/api/customer', {
        username: username,
        password: password
      }).pipe(take(1)).subscribe((answer: any) => {
        if (answer.error) {
          return [0, answer.error];
        } else {
          this.customers.push(answer);
          return [-1, ''];
        }
      });
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      return [-1, ''];
    }
    return [0, 'Username already exists'];
  }
}
