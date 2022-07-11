import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router) { }

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  error = [-1, ''];

  onRegister() {
    const username = this.registerForm.value.username ?? '';
    const password = this.registerForm.value.password ?? '';
    const confirmPassword = this.registerForm.value.confirmPassword ?? '';
    this.error = this.authService.register(username, password, confirmPassword);
    if (this.error[0] === -1) {
      this.router.navigate(['/']);
    }
  }
}
