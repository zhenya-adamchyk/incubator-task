import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  nameValue = '';
  passwordValue = '';
  passwordVisible = false;
  registrationForm: FormGroup;

  constructor(public db: AngularFireDatabase, private authService: AuthService) {
    this.registrationForm = new FormGroup({
      "email": new FormControl('', [Validators.required, Validators.email]),
      "userPassword": new FormControl('', [Validators.required, Validators.pattern("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}")])
    });
   }

  watchPass(): void {
    this.passwordVisible = !this.passwordVisible
  }

  SignIn() {
    if (this.registrationForm.value.email && this.registrationForm.value.userPassword) {
      this.authService.SignIn(this.registrationForm.value.email, this.registrationForm.value.userPassword);
    }
  }
}
