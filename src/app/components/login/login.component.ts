import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  isCorrect = true;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.isCorrect = this.authService.login(this.loginForm.value.username ?? '', this.loginForm.value.password ?? '');
    if (this.isCorrect) {
      this.router.navigate(['/']);
    }
  }

}
