import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import  { categories }  from '../../shared/constants/categories';
import { Question } from '../../shared/interfaces/question';
import { AuthService } from '../../shared/services/auth.service';
import { QuestionService } from '../../shared/services/question.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  tags: string[];
  newQuestionForm: FormGroup;
  items: FormArray;
  isInvalidForm!: boolean;
  user
  responseError: string;

  constructor(private httpService: QuestionService, private router: Router, public authService: AuthService) {
    this.user = authService.userData;
    this.tags = categories;
    this.newQuestionForm = new FormGroup({
      "title": new FormControl('', [Validators.required]),
      "text": new FormControl('', [Validators.required]),
      "items": new FormArray(this.tags.map(cat => new FormControl(false)))
    });
   }

  ngOnInit(): void {
  }

  checkCategories(arr: unknown[]): boolean {
    return arr.some(v => v !== false)
  }

  submitQuestion() {
    console.log(this.newQuestionForm.value.items)
    if (this.newQuestionForm.value.title && this.newQuestionForm.value.text && this.checkCategories(this.newQuestionForm.value.items)) {
      this.isInvalidForm = false;
      const obj: Question = {
        title: this.newQuestionForm.value.title,
        text: this.newQuestionForm.value.text,
        date: new Date().getTime(),
        categories: this.newQuestionForm.value.items.map(((v, ind) => v ? this.tags[ind] : '')),
        user: this.user.email,
        id: '',
        comments: []
      }
      this.httpService.postQuestion(obj).subscribe(
        data => this.router.navigate(['/main']),
        err => this.responseError = err
        );
    } else {
      this.isInvalidForm = true;
    }
  }
}
