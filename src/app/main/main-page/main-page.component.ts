import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question } from '../../shared/interfaces/question';
import { AuthService } from '../../shared/services/auth.service';
import { QuestionService } from '../../shared/services/question.service';
import { categories } from '../../shared/constants/categories';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit{

  responseError: string;
  categories: string[];
  filtersForm: FormGroup;
  isAdmin: boolean;
  refreshQuestions$ = new BehaviorSubject<boolean>(true)
  questions$: Observable<Question[]>
  lineDisplay: boolean;

  constructor(public authService: AuthService, public router: Router, private httpService: QuestionService) {
    this.lineDisplay = JSON.parse(localStorage.getItem('questionsView'));
    this.isAdmin = authService.isAdmin;
    this.categories = categories;
    this.filtersForm = new FormGroup({
      "solved": new FormControl(),
      "time": new FormControl(),
      "categories": new FormArray(categories.map(v => new FormControl())),
      "last": new FormControl(),
      "display": new FormControl(),
      "onlyUser": new FormControl(),
      "moderation": new FormControl(),
    })
   }

   ngOnInit() {
    this.questions$ = this.refreshQuestions$.pipe(switchMap(() => this.httpService.getQuestions()))
   }

   reset(): void {
     this.filtersForm.reset();
   }

   deleteQuestion(id:string){
    this.httpService.deleteQuestion(id).subscribe(() => this.refreshQuestions$.next(false));
  }

  approveQuestion(id:string){
    const obj: Question = {
      approve: true
    }
    this.httpService.patchQuestion(id, obj).subscribe(() => this.refreshQuestions$.next(false));
  }

  setQuestionsView(view: boolean): void {
    if (view === JSON.parse(localStorage.getItem('questionsView'))) return
    localStorage.setItem('questionsView', `${view}`)
    this.lineDisplay = !this.lineDisplay
  }
}
