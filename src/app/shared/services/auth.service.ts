import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import  firebase  from 'firebase/app';
import 'firebase/auth'
import { User} from '../interfaces/User'
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: User;
  isAdmin: boolean;

  constructor(private fireAuth: AngularFireAuth, private http: HttpClient) { }

  checkAuth(): Observable<User> {
    return this.fireAuth.authState.pipe(map((user: unknown) => {
      this.userData = user as User;
      return this.userData;
    }),
    switchMap((data: User) => this.getAdmins())
    )
  }

  async loginWithGoogle() {
    await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  async loginWithFaceBook() {
    await this.fireAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  }

  async loginWithGithub() {
    await this.fireAuth.signInWithPopup(new firebase.auth.GithubAuthProvider())
  }

  async SignUp(email: string, password: string) {
    await this.fireAuth.createUserWithEmailAndPassword(email, password)
  }

  async SignIn(email: string, password: string) {
    await this.fireAuth.signInWithEmailAndPassword(email, password)
  }

  async SignOut() {
    await this.fireAuth.signOut();
  }

  getAdmins(): Observable<User> {
    if (this.userData) {
      return this.http.get<string[]>(`${environment.firebase.databaseURL}/admins.json`).pipe(map(data => {
        this.isAdmin = data.find(v => v === this.userData?.email) ? true : false
        return this.userData;
      })) as Observable<User>
    }
    return of(this.userData)
  }
}
