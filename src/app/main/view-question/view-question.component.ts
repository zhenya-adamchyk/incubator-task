import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Question } from '../../shared/interfaces/question';
import { QuestionService } from '../../shared/services/question.service';
import { AuthService } from '../../shared/services/auth.service';
import { Comment } from 'src/app/shared/interfaces/comment';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss']
})

export class ViewQuestionComponent implements OnInit {

  question: Question

  readonly question$ = this.route.params.pipe(
    switchMap(param => this.httpService.getQuestion(param.id)),
    tap(v =>  this.question = v)
  )

  isAdmin: boolean;
  text: string;
  isInvalidArea: boolean;
  currentUser: string;
  responseError: string;

  constructor(private route: ActivatedRoute, private httpService: QuestionService, private authService: AuthService) {
    this.isAdmin = authService.isAdmin
   }

  ngOnInit() {
      this.currentUser = this.authService.userData.email;
  }

  addComment(): void {
    if (this.text) {
      this.isInvalidArea = false;
      const newComment: Comment = {
        author: this.currentUser,
        text: this.text,
        date: new Date().getTime(),
        resolved: false,
      }
      this.question.comments ? this.question.comments.push(newComment) : this.question.comments = [newComment]
      this.httpService.patchQuestion(this.question.id, this.question).subscribe()
    } else {
      this.isInvalidArea = true
    }
  }

  deleteQuestion(): void {
    this.httpService.deleteQuestion(this.question.id).subscribe();
  }

  approve(): void {
    const obj: Question = {
      approve: true
    }
    this.httpService.patchQuestion(this.question.id, obj).subscribe()
  }
}
