import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  userMail: string;

  constructor(public authService: AuthService, public router: Router) {
    this.userMail = this.authService.userData.email;
   }

  ngOnInit(): void {
  }

  SignOut() {
    this.authService.SignOut()
    .then(() => this.router.navigate(['/']))
  }

}
