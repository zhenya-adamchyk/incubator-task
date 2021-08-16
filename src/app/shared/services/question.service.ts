import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Question } from '../interfaces/question';
import { map } from 'rxjs/operators';
import { Comment } from '../interfaces/comment';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${environment.firebase.databaseURL}/questions.json`).pipe(map(v => {
      return Object.keys(v).map(key => ({ ...v[key], id: key }))
    }))
  }

  postQuestion(card: Question): Observable<Question[]> {
    return this.http.post<Question[]>(`${environment.firebase.databaseURL}/questions.json`, card)
  }

  getQuestion(id: string): Observable<Question> {
    return this.http.get<Question>(`${environment.firebase.databaseURL}/questions/${id}.json`)
  }

  patchQuestion(id: string, updatedQuestion: Question) {
    return this.http.patch(`${environment.firebase.databaseURL}/questions/${id}.json`, updatedQuestion)
  }

  deleteQuestion(id: string) {
    return this.http.delete(`${environment.firebase.databaseURL}/questions/${id}.json`)
  }

  patchComment(id: string, idComment: number, resolve: Comment) {
    return this.http.patch(`${environment.firebase.databaseURL}/questions/${id}/comments/${idComment}.json`, resolve)
  }
}
