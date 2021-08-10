import { Component, Input } from '@angular/core';
import { Question } from '../../shared/interfaces/question';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() question: Question

  isAdmin = false;

  constructor() {
  }

}
