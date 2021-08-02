import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import  firebase  from 'firebase/app';
import 'firebase/auth'
import { Observable } from 'rxjs';
import { User} from '../interfaces/User'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData!: User;

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  checkAuth(): Observable<User> {
    return this.fireAuth.authState.pipe(map((user: unknown) => {
      this.userData = user as User;
      return this.userData;
    }))
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
}
