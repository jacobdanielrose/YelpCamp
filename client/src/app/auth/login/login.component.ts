import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(public authService: AuthService) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      password: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
    });
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginForm.markAllAsTouched();
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password);
  }

}
