import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../shared/interfaces/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: any
  user: string;

  constructor() { }

  ngOnInit(): void {
  }

}
