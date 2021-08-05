import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import  { categories }  from '../shared/constants/categories';
import { Card } from '../shared/interfaces/card';
import { QuestionService } from '../shared/services/question.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  tags: string[];

  newQuestionForm: FormGroup;

  items!: FormArray;

  isValidForm!: boolean;

  constructor(private httpService: QuestionService, private router: Router) {
    this.tags = categories;
    this.newQuestionForm = new FormGroup({
      "title": new FormControl('', [Validators.required]),
      "text": new FormControl('', [Validators.required]),
      "items": new FormArray(this.tags.map(cat => new FormControl(cat)))
    });
   }

  ngOnInit(): void {
  }

  checkCategories(arr: unknown[]): boolean {
    return arr.some(v => v !== false)
  }


  submitQuestion() {
    if (this.newQuestionForm.value.title && this.newQuestionForm.value.text && this.checkCategories(this.newQuestionForm.value.items)) {
      this.isValidForm = false;
      const date = new Date().getTime();
      const obj: Card = {
        title: this.newQuestionForm.value.title,
        text: this.newQuestionForm.value.text,
        date: date,
        categories: this.newQuestionForm.value.items.filter((v: boolean) => v !== false)
      }
      this.httpService.postCard(obj);
      this.router.navigate(['/main'])
    } else {
      this.isValidForm = true;
    }
  }
}
