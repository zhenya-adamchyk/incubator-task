import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: string;


  constructor(public authService: AuthService, public router: Router, private activatedRoute:ActivatedRoute) {

   }

  ngOnInit(): void {
    this.user = this.authService.userData?.displayName;
  }

  SignOut() {
    this.authService.SignOut()
    .then(() => this.router.navigate(['/']))
  }

}
