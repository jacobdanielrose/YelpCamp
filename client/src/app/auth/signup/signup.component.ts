import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {


  signupForm: FormGroup;

  constructor(public authService: AuthService) {
    this.signupForm = new FormGroup({
      email: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      username: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      password: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
    });
  }

  get email() {
    return this.signupForm.get('email')!;
  }

  get username() {
    return this.signupForm.get('username')!;
  }

  get password() {
    return this.signupForm.get('password')!;
  }

  onSignup() {
    if (this.signupForm.invalid) {
      return;
    }

    this.signupForm.markAllAsTouched();
    const { email, username, password } = this.signupForm.value;
    this.authService.createUser(email, username, password);
  }

}
