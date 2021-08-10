import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Question } from '../interfaces/question';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  baseUrl = 'https://incubator-task-default-rtdb.europe-west1.firebasedatabase.app'

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/questions.json`).pipe(map(v => {
      return this.makeArrFromResponse(v);
    }))
  }

  postQuestion(card: Question): Observable<Question[]> {
    return this.http.post<Question[]>(`${this.baseUrl}/questions.json`, card)
  }

  getQuestion(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/questions.json`).pipe(map(v => {
      return this.makeArrFromResponse(v).find(v => v.id === id);
    }))
  }

  patchQuestion(id: string, updatedQuestion: any) {
    return this.http.patch(`${this.baseUrl}/questions/${id}.json`, updatedQuestion)
  }

  makeArrFromResponse(response: unknown): Question[]  {
    const idArr = Object.keys(response);
    const resArr = Object.values(response);
    for (let i = 0; i < resArr.length; i++) {
      resArr[i].id = idArr[i]
    }
    return resArr;
  }
}
