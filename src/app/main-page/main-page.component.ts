import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  userMail: string;

  constructor(public authService: AuthService) {
    this.userMail = this.authService.userData.email;
   }

  ngOnInit(): void {
  }

}
