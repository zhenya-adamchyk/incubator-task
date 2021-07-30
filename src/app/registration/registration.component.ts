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
  passwordVisible = false;
  registrationForm: FormGroup;

  constructor(public db: AngularFireDatabase, public authService: AuthService, public router: Router) {
    this.registrationForm = new FormGroup({
      "email": new FormControl('', [Validators.required, Validators.email]),
      "userPassword": new FormControl('', [Validators.required, Validators.pattern("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}")])
    });
    // db.list('/courses').valueChanges().subscribe(console.log)
  }

  async loginWithGoogle() {
    await this.authService.loginWithGoogle();
    this.router.navigate(['/main']);
  }

  async loginWithFaceBook() {
    await this.authService.loginWithFaceBook();
    this.router.navigate(['/main']);
  }

  async loginWithGithub() {
    await this.authService.loginWithGithub();
    this.router.navigate(['/main']);
  }

  async SignUp() {
    if (this.registrationForm.value.email && this.registrationForm.value.userPassword) {
      await this.authService.SignUp(this.registrationForm.value.email, this.registrationForm.value.userPassword);
      this.router.navigate(['/main']);
    }
  }

  watchPass(): void {
    this.passwordVisible = !this.passwordVisible
  }
}
