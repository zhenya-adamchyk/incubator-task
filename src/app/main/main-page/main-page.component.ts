import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from '../../shared/interfaces/question';
import { AuthService } from '../../shared/services/auth.service';
import { QuestionService } from '../../shared/services/question.service';
import { categories } from '../../shared/constants/categories';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FiltersOptions } from 'src/app/shared/interfaces/filters-options';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent{

  responseError: string;
  filterOption: FiltersOptions;
  sortOption: string;
  categories: string[];
  filtersForm: FormGroup;
  sortForm: FormGroup;

  readonly questions$: Observable<Question[]> = this.httpService.getQuestions();

  constructor(public authService: AuthService, public router: Router, private httpService: QuestionService) {
    this.categories = categories;
    this.filtersForm = new FormGroup({
      "solved": new FormControl(),
      "time": new FormControl(),
      "categories": new FormArray(categories.map(v => new FormControl())),
      "last": new FormControl(),
      "display": new FormControl()
    })
   }

   reset(): void {
     this.filtersForm.reset()
   }
}
