import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../shared/interfaces/card';
import { AuthService } from '../shared/services/auth.service';
import { QuestionService } from '../shared/services/question.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  cards: Card[] = [];

  constructor(public authService: AuthService, public router: Router, private httpService: QuestionService) {

  }

  ngOnInit(): void {
    this.httpService.getCards().subscribe((data: Card[]) => {
      this.cards = data
      console.log(data)
    });
  }

}
