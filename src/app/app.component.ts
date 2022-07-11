import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'cs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Carsharing_FK_Angular';

  customerId = '';

  interval: NodeJS.Timer;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.interval = setInterval(() => {
      const customer = this.authService.getCustomer();
      if (customer) {
        this.customerId = customer._id;
      } else {
        this.customerId = '';
      }
    }, 100);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
