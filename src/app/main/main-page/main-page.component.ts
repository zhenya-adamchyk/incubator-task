import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../../shared/interfaces/question';
import { AuthService } from '../../shared/services/auth.service';
import { QuestionService } from '../../shared/services/question.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  cards: Question[] = [];
  responseError: string;

  constructor(public authService: AuthService, public router: Router, private httpService: QuestionService) {

  }

  ngOnInit(): void {
    this.httpService.getQuestions().subscribe(
      (data: Question[]) => this.cards = data,
      err => this.responseError = err
    );
  }

}
