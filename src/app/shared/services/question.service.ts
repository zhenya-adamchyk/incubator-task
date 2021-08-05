import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Card } from '../interfaces/card';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  baseUrl = 'https://incubator-task-default-rtdb.europe-west1.firebasedatabase.app'

  constructor(private http: HttpClient) { }

  getCards(): Observable<Card[]> {
    return this.http.get(`${this.baseUrl}/questions.json`).pipe(map(v => Object.values(v))) as Observable<Card[]>
  }

  postCard(card: Card): void {
    this.http.post(`${this.baseUrl}/questions.json`, card).subscribe();
  }
}
