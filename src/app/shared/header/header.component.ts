import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: string;
  isDark: boolean;

  constructor(@Inject(DOCUMENT) private document: Document ,public authService: AuthService, public router: Router,
    private render: Renderer2 ) {
      if (localStorage.getItem('theme')) {
        this.render.setAttribute(this.document.body, 'class', localStorage.getItem('theme'))
        if (localStorage.getItem('theme') === 'black-theme') this.isDark = true
      }
    }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe(data => this.user = data?.email)
  }

  SignOut() {
    this.authService.SignOut()
    .then(() => this.router.navigate(['/login']))
  }

  switchTheme() {
    if (localStorage.getItem('theme') === 'light-theme' || !localStorage.getItem('theme')) {
      this.render.setAttribute(this.document.body, 'class', 'black-theme')
      localStorage.setItem('theme', 'black-theme')
      this.isDark = true
    } else {
      this.isDark = false
      this.render.setAttribute(this.document.body, 'class', 'light-theme')
      localStorage.setItem('theme', 'light-theme')
    }
  }
}
