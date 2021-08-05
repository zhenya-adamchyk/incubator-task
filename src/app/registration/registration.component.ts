import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
        `],
})

export class RegistrationComponent {

  nameValue = '';
  passwordValue = '';
  errorMessage = '';
  messengerMessage = '';
  passwordVisible = false;
  registrationForm: FormGroup;

  constructor(public db: AngularFireDatabase, public authService: AuthService, public router: Router) {
    this.registrationForm = new FormGroup({
      "email": new FormControl('', [Validators.required, Validators.email]),
      "userPassword": new FormControl('', [Validators.required, Validators.pattern("[0-9a-zA-Z]{6,}")])
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
    .then(() => this.router.navigate(['/main']))
    .catch(error => {
      if (error.message !== 'The popup has been closed by the user before finalizing the operation.') {
        this.messengerMessage = error.message
      }
    });
  }

  loginWithFaceBook() {
    this.authService.loginWithFaceBook()
    .then(() => this.router.navigate(['/main']))
    .catch(error => {
      if (error.message !== 'The popup has been closed by the user before finalizing the operation.') {
        this.messengerMessage = error.message
      }
    });
  }

  loginWithGithub() {
    this.authService.loginWithGithub()
    .then(() => this.router.navigate(['/main']))
    .catch(error => {
      if (error.message !== 'The popup has been closed by the user before finalizing the operation.') {
        this.messengerMessage = error.message
      }
    });
  }

  SignUp() {
    if (this.registrationForm.value.email && this.registrationForm.value.userPassword) {
      this.authService.SignUp(this.registrationForm.value.email, this.registrationForm.value.userPassword)
      .then(() => this.router.navigate(['/main']))
      .catch(error => this.errorMessage = error.message);
    }
  }

  watchPass(): void {
    this.passwordVisible = !this.passwordVisible
  }
}
