import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/interfaces/question';
import { AuthService } from 'src/app/shared/services/auth.service';
import { QuestionService } from 'src/app/shared/services/question.service';
import { Comment } from '../../shared/interfaces/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{

  @Input() comment: Comment
  user: string;
  @Input() id: number
  @Input() question: Question;
  resolved: boolean

  constructor(private httpService: QuestionService, public authService: AuthService) {
    this.user = authService.userData.email

   }

   ngOnInit() {
    this.resolved = this.comment.resolved
   }

  switchResolve() {
    const obj: Comment = {
      resolved: !this.resolved
    }
    this.httpService.patchComment(this.question.id, this.id, obj).subscribe()
  }
}
