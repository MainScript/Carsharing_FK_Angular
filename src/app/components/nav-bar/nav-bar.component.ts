import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cs-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnChanges {

  @Input() customerId = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['customerId'].currentValue) {
      this.customerId = changes['customerId'].currentValue;
    }
  }
}
