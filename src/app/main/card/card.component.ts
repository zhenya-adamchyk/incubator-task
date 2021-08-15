import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { QuestionService } from 'src/app/shared/services/question.service';
import { Question } from '../../shared/interfaces/question';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() question: Question;
  @Output() deleteQuestion = new EventEmitter<string>();
  @Output() approveQuestion = new EventEmitter<string>();

  isAdmin: boolean;

  constructor(public authService: AuthService, private httpService: QuestionService) {
    this.isAdmin = authService.isAdmin
  }

  delete(id: string) {
    this.deleteQuestion.emit(id);
  }

  approve(id: string): void {
    this.approveQuestion.emit(id);
  }

}
