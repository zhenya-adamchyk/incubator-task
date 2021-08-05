import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../shared/interfaces/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Card

  isAdmin = false;

  newDate: string;

  constructor(public datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.newDate = this.datePipe.transform(this.card.date, 'yyyy-MM-dd');
  }

}
