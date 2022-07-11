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

  customerId = -1;

  interval: NodeJS.Timer;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.customerId = this.authService.findCustomerId();
    }, 100);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
