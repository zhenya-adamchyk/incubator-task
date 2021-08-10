import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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

  readonly question$ = this.route.params.pipe(
    switchMap(param => this.httpService.getQuestion(param.id))
  )

  isAdmin = false;
  // question: any;
  text: string;
  isInvalidArea: boolean;
  currentUser: string;
  responseError: string;

  constructor(private route: ActivatedRoute, private httpService: QuestionService, private authService: AuthService) { }

  ngOnInit() {
      // this.route.params.pipe(
      //     switchMap(param => this.httpService.getQuestion(param.id))
      // ).subscribe(data => {
      //   this.question = data,
      //   err => this.responseError = err;
      // })
      this.currentUser = this.authService.userData.email;
  }

  addComment(): void {
    // if (this.text) {
    //   this.isInvalidArea = false;
    //   const newComment: Comment = {
    //     author: this.currentUser,
    //     text: this.text,
    //     date: new Date().getTime(),
    //     resolved: false,
    //   }
    //   if (this.question.comments) {
    //     this.question.comments.push(newComment)
    //   } else {
    //     this.question.comments = [newComment]
    //   }
    //   this.httpService.patchQuestion(this.question.id, this.question).subscribe(data => console.log(data,' HERE'))
    // } else {
    //   this.isInvalidArea = true
    // }
  }
}
