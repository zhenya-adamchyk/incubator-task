import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { QuestionService } from '../../shared/services/question.service';
import  { categories }  from '../../shared/constants/categories';
import { Question } from '../../shared/interfaces/question';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  newQuestionForm: FormGroup;
  items: FormArray;
  isInvalidForm!: boolean;
  tags: string[];
  isAdmin: boolean;
  responseError: string;
  @Input() question: Question;

  constructor(private httpService: QuestionService, private router: Router, public authService: AuthService) {
    this.tags = categories;
    this.isAdmin = authService.userData.isAdmin
   }

  ngOnInit(): void {
    this.newQuestionForm = new FormGroup({
      "title": new FormControl(this.question.title, [Validators.required]),
      "text": new FormControl(this.question.text, [Validators.required]),
      "items": new FormArray(this.tags.map(cat => this.question.categories.find(v => v === cat) ? new FormControl(true) : new FormControl(false)))
    });
  }

  checkCategories(arr: unknown[]): boolean {
    return arr.some(v => v !== false)
  }

  updateQuestion() {
    if (this.newQuestionForm.value.title && this.newQuestionForm.value.text && this.checkCategories(this.newQuestionForm.value.items)) {
      this.isInvalidForm = false;
      const obj = {
        title: this.newQuestionForm.value.title,
        text: this.newQuestionForm.value.text,
        categories: this.newQuestionForm.value.items.map(((v, ind) => v ? this.tags[ind] : '')).filter(v => v)
      }
      this.httpService.patchQuestion(this.question.id, obj).subscribe(
        data => this.router.navigate(['/main']),
        err => this.responseError = err
        );
    } else {
      this.isInvalidForm = true;
    }
  }

  deleteQuestion(): void {
    console.log(this.question.id)
    this.httpService.deleteQuestion(this.question.id).subscribe(data => data, err => this.responseError = err);
  }

  approve(): void {
    const obj: Question = {
      approve: true
    }
    this.httpService.patchQuestion(this.question.id, obj).subscribe(data => data, err => this.responseError = err);
  }

}
