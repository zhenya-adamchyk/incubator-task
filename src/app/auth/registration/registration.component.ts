import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent {

  messengerMessage: string;
  passwordVisible = false;
  registrationForm: FormGroup;
  registrationError: string;

  constructor(public authService: AuthService, public router: Router) {
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
      .catch(error => this.registrationError = error.message);
    }
  }

  watchPass(): void {
    this.passwordVisible = !this.passwordVisible
  }
}
